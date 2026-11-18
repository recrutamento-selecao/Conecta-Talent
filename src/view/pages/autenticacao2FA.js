import { supabase } from '../utils/supabaseClient.js';

export function renderVerificacao() {
    const container = document.createElement('div');
    container.className = 'page-auth page-verificacao';

    container.innerHTML = `
        <!-- Painel Lateral Esquerdo (Branding) -->
        <aside class="auth-banner">
            <div class="banner-overlay"></div>
            <div class="banner-content">
                <div class="brand-logo">
                    <img src="./assets/images/logo.png" alt="ConectaTalent" />
                </div>
                
                <h1 class="banner-title">Encontre os talentos certos para sua empresa</h1>
                <p class="banner-subtitle">
                    Crie sua conta, publique suas vagas e conecte-se a profissionais qualificados de forma simples e eficiente.
                </p>

                <ul class="banner-features">
                    <li>
                        <div class="feature-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <span>Publique vagas de forma rápida</span>
                    </li>
                    <li>
                        <div class="feature-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                            </svg>
                        </div>
                        <span>Acompanhe candidaturas em tempo real</span>
                    </li>
                    <li>
                        <div class="feature-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </div>
                        <span>Construa um banco de talentos qualificados</span>
                    </li>
                </ul>

                <p class="banner-quote">Grandes equipes constroem grandes resultados</p>
            </div>

            <!-- Cartão Flutuante de Segurança -->
            <div class="banner-card-float">
                <div class="float-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <div class="float-text">
                    <strong>Ambiente 100% Seguro</strong>
                    <span>Os seus dados e acessos estão protegidos com criptografia de ponta a ponta.</span>
                </div>
            </div>
        </aside>

        <!-- Área Principal de Verificação (Direita) -->
        <main class="auth-main">
            <div class="auth-card">
                <h2 class="auth-title">Verificação em duas etapas</h2>
                <p class="auth-instructions">
                    Abra o seu aplicativo autenticador (Google ou Microsoft Authenticator) e digite o código de 6 dígitos gerado para a sua conta.
                </p>

                <form id="form-verificacao" class="otp-form">
                    <div class="otp-inputs-container">
                        <input type="text" maxlength="1" class="otp-input" data-index="0" inputmode="numeric" pattern="[0-9]*" required />
                        <input type="text" maxlength="1" class="otp-input" data-index="1" inputmode="numeric" pattern="[0-9]*" required />
                        <input type="text" maxlength="1" class="otp-input" data-index="2" inputmode="numeric" pattern="[0-9]*" required />
                        <input type="text" maxlength="1" class="otp-input" data-index="3" inputmode="numeric" pattern="[0-9]*" required />
                        <input type="text" maxlength="1" class="otp-input" data-index="4" inputmode="numeric" pattern="[0-9]*" required />
                        <input type="text" maxlength="1" class="otp-input" data-index="5" inputmode="numeric" pattern="[0-9]*" required />
                    </div>

                    <div class="otp-timer-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>O código é renovado a cada <strong>30 segundos</strong> no aplicativo.</span>
                    </div>

                    <button type="submit" class="btn-primary btn-block">Verificar código</button>
                    
                    <button type="button" id="btn-voltar-config" class="btn-link">Configurar novo autenticador</button>
                </form>
            </div>
        </main>
    `;

    initOTPBehavior(container);

    return container;
}

function initOTPBehavior(container) {
    const inputs = container.querySelectorAll('.otp-input');
    const form = container.querySelector('#form-verificacao');
    const btnVoltarConfig = container.querySelector('#btn-voltar-config');

    // Foco automático no primeiro quadradinho ao carregar a tela
    setTimeout(() => {
        if (inputs[0]) inputs[0].focus();
    }, 100);

    // Comportamento de avanço, retrocesso (Backspace) e colar (Ctrl+V) nos 6 dígitos
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            // Garante apenas números
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            
            if (e.target.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                inputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
            if (pasteData) {
                pasteData.split('').forEach((char, i) => {
                    if (inputs[i]) {
                        inputs[i].value = char;
                    }
                });
                const nextIndex = Math.min(pasteData.length, inputs.length - 1);
                if (inputs[nextIndex]) {
                    inputs[nextIndex].focus();
                }
            }
        });
    });

    // Submissão dos 6 dígitos do aplicativo autenticador via Supabase MFA
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const code = Array.from(inputs).map(i => i.value).join('');
        if (code.length !== 6) {
            alert('Por favor, preencha todos os 6 dígitos do aplicativo.');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            submitBtn.textContent = 'A validar código...';
            submitBtn.disabled = true;

            // 1. Verifica se o utilizador possui sessão ativa (AAL1)
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session) {
                alert('Sessão expirada ou utilizador não autenticado. Por favor, faça login novamente.');
                window.location.hash = '#login';
                return;
            }

            // 2. Lista os fatores MFA configurados na conta do utilizador
            const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
            if (factorsError) throw factorsError;

            // Procura o fator TOTP que já foi ativado/verificado
            const totpFactor = factorsData.totp.find(factor => factor.status === 'verified');
            if (!totpFactor) {
                alert('Nenhum aplicativo autenticador configurado nesta conta. Redirecionando para configuração...');
                window.location.hash = '#mfa-config';
                return;
            }

            // 3. Cria o desafio de autenticação (challenge) para esse fator
            const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
                factorId: totpFactor.id
            });
            if (challengeError) throw challengeError;

            // 4. Valida o código de 6 dígitos inserido pelo utilizador (eleva a sessão para AAL2)
            const { data: verifyData, error: verifyError } = await supabase.auth.mfa.verify({
                factorId: totpFactor.id,
                challengeId: challengeData.id,
                code: code
            });
            if (verifyError) throw verifyError;

            // Guarda o novo token de sessão atualizado (nível AAL2)
            if (verifyData && verifyData.access_token) {
                localStorage.setItem('token', verifyData.access_token);
            }

            sessionStorage.removeItem('auth_email');
            alert('Verificação concluída com sucesso!');

            // Redireciona para o dashboard principal
            window.location.hash = '#dashboard-administrador'; 

        } catch (error) {
            console.error('Erro na verificação do 2FA:', error.message);
            alert('Código incorreto ou expirado. Verifique o seu aplicativo autenticador e tente novamente.');
            
            inputs.forEach(input => input.value = '');
            if (inputs[0]) inputs[0].focus();
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Redireciona caso o utilizador precise configurar o QR Code pela primeira vez
    if (btnVoltarConfig) {
        btnVoltarConfig.addEventListener('click', () => {
            window.location.hash = '#mfa-config';
        });
    }
}