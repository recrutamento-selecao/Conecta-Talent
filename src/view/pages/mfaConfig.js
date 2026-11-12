import { supabase } from '../utils/supabaseClient.js';

export function renderMFAConfig() {
    const container = document.createElement('div');
    container.className = 'auth-container';
    container.style.cssText = 'max-width: 450px; margin: 40px auto; padding: 30px; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);';

    container.innerHTML = `
        <h2 style="margin-bottom: 20px; text-align: center;">Segurança da Conta - 2FA</h2>
        <p style="margin-bottom: 20px; color: #666; text-align: center;">
            Proteja a sua conta utilizando um aplicativo autenticador (Google Authenticator, Microsoft Authenticator, etc.).
        </p>

        <!-- Bloco temporário de login para testes -->
        <div id="login-temp-section" style="margin-bottom: 20px; padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
            <p style="font-size: 13px; font-weight: 500; margin-bottom: 8px; color: #334155;">Identificação para Teste (Enquanto o login oficial não fica pronto):</p>
            <input type="password" id="senha-temp" placeholder="Insira a senha do e-mail thaeny10@hotmail.com" style="width: 100%; padding: 8px; font-size: 14px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 10px;" />
        </div>

        <button id="btn-gerar-mfa" style="width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
            Configurar Autenticador por App
        </button>
        
        <div id="qr-code-section" style="display: none; margin-top: 25px; text-align: center;">
            <p style="margin-bottom: 10px; font-weight: 500;">1. Escaneie o QR Code abaixo com o seu aplicativo:</p>
            <div id="qr-code-container" style="display: inline-block; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;"></div>
        </div>
        
        <div id="verify-section" style="display: none; margin-top: 25px;">
            <p style="margin-bottom: 8px; font-weight: 500;">2. Insira o código de 6 dígitos gerado no app:</p>
            <input type="text" id="codigo-otp-mfa" maxlength="6" placeholder="000000" style="width: 100%; padding: 10px; font-size: 18px; text-align: center; letter-spacing: 4px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 15px;" />
            <button id="btn-verificar-mfa" style="width: 100%; padding: 12px; background: #16a34a; color: #fff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
                Verificar e Ativar 2FA
            </button>
        </div>
    `;

    let factorIdTemporario = null;

    setTimeout(() => {
        const btnGerar = container.querySelector('#btn-gerar-mfa');
        const btnVerificar = container.querySelector('#btn-verificar-mfa');

        if (btnGerar) {
            btnGerar.addEventListener('click', async () => {
                try {
                    btnGerar.disabled = true;
                    btnGerar.textContent = 'A autenticar e gerar QR Code...';

                    // 1. Verifica se já existe sessão ativa
                    let { data: { session } } = await supabase.auth.getSession();

                    // Se não estiver logado, faz o login automático com a conta de teste
                    if (!session) {
                        const senha = container.querySelector('#senha-temp').value.trim();
                        if (!senha) {
                            alert('Por favor, insira a senha para gerar a sessão de teste.');
                            btnGerar.disabled = false;
                            btnGerar.textContent = 'Configurar Autenticador por App';
                            return;
                        }

                        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                            email: 'thaeny10@hotmail.com',
                            password: senha
                        });

                        if (loginError) throw loginError;
                        session = loginData.session;
                    }

                    // 2. Com a sessão ativa, executa o registo do MFA
                    const { data, error } = await supabase.auth.mfa.enroll({
                        factorType: 'totp',
                        issuer: 'ConectaTalent',
                        friendlyName: 'Autenticador ConectaTalent'
                    });

                    if (error) throw error;

                    factorIdTemporario = data.id;

                    // Oculta o campo de senha temporário e mostra o QR Code
                    container.querySelector('#login-temp-section').style.display = 'none';
                    container.querySelector('#qr-code-container').innerHTML = data.totp.qr_code;
                    container.querySelector('#qr-code-section').style.display = 'block';
                    container.querySelector('#verify-section').style.display = 'block';
                    btnGerar.style.display = 'none';

                } catch (err) {
                    console.error('Erro detalhado ao iniciar MFA:', err);
                    alert('Erro: ' + (err.message || 'Tente novamente.'));
                    btnGerar.disabled = false;
                    btnGerar.textContent = 'Configurar Autenticador por App';
                }
            });
        }

        if (btnVerificar) {
            btnVerificar.addEventListener('click', async () => {
                const codigo = container.querySelector('#codigo-otp-mfa').value.trim();

                if (!codigo || codigo.length !== 6) {
                    alert('Por favor, insira um código válido de 6 dígitos.');
                    return;
                }

                try {
                    btnVerificar.disabled = true;
                    btnVerificar.textContent = 'A validar...';

                    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
                        factorId: factorIdTemporario
                    });

                    if (challengeError) throw challengeError;

                    const { error: verifyError } = await supabase.auth.mfa.verify({
                        factorId: factorIdTemporario,
                        challengeId: challengeData.id,
                        code: codigo
                    });

                    if (verifyError) throw verifyError;

                    alert('Autenticação de dois fatores (2FA) ativada com sucesso!');
                    window.location.hash = '#candidato-vagas';

                } catch (err) {
                    console.error('Erro na verificação do código:', err);
                    alert('Código incorreto ou expirado. Tente novamente.');
                    btnVerificar.disabled = false;
                    btnVerificar.textContent = 'Verificar e Ativar 2FA';
                }
            });
        }
    }, 0);

    return container;
}