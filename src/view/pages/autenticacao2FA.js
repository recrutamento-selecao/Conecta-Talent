export function renderVerificacao() {
    const container = document.createElement('div');
    container.className = 'page-auth page-verificacao';

    // ALTERNATIVA 1 (Plano Free): Deteta automaticamente se o utilizador abriu o link do e-mail com um token na URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenUrl = urlParams.get('token') || urlParams.get('token_hash') || urlParams.get('access_token');
    
    if (tokenUrl) {
        autenticarComTokenUrl(tokenUrl);
    }

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
                <h2 class="auth-title">Verificação de segurança</h2>
                <p class="auth-instructions">
                    Para continuar, digite o código de 6 dígitos ou clique no link enviado para o seu e-mail.
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
                        <span>O código é válido por <strong id="timer-text">5 minutos</strong>.</span>
                    </div>

                    <button type="submit" class="btn-primary btn-block">Verificar código</button>
                    
                    <button type="button" id="btn-reenviar" class="btn-link">Reenviar código</button>
                </form>
            </div>
        </main>
    `;

    initOTPBehavior(container);

    return container;
}

// Função auxiliar da Alternativa 1 para validar automaticamente o token recebido por URL do e-mail
async function autenticarComTokenUrl(token) {
    const emailGuardado = sessionStorage.getItem('auth_email');
    if (!emailGuardado) return;

    try {
        const response = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailGuardado,
                token: token
            })
        });

        const resultado = await response.json();

        if (response.ok && resultado.session) {
            localStorage.setItem('token', resultado.session.access_token);
            sessionStorage.removeItem('auth_email');
            window.location.hash = '#/dashboard-administrador';
        }
    } catch (error) {
        console.error('Erro na validação automática do token via URL:', error);
    }
}

function initOTPBehavior(container) {
    const inputs = container.querySelectorAll('.otp-input');
    const form = container.querySelector('#form-verificacao');
    const btnReenviar = container.querySelector('#btn-reenviar');

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.length === 1 && index < inputs.length - 1) {
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
            const pasteData = e.clipboardData.getData('text').trim().slice(0, 6);
            if (/^\d+$/.test(pasteData)) {
                pasteData.split('').forEach((char, i) => {
                    if (inputs[i]) {
                        inputs[i].value = char;
                    }
                });
                if (inputs[Math.min(pasteData.length, inputs.length - 1)]) {
                    inputs[Math.min(pasteData.length, inputs.length - 1)].focus();
                }
            }
        });
    });

    // Submissão manual dos dígitos OTP através do BACKEND
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const code = Array.from(inputs).map(i => i.value).join('');
        if (code.length !== 6) {
            alert('Por favor, preencha todos os 6 dígitos.');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            submitBtn.textContent = 'A verificar...';
            submitBtn.disabled = true;

            const emailGuardado = sessionStorage.getItem('auth_email');
            
            if (!emailGuardado) {
                alert('E-mail de verificação não encontrado. Por favor, faça login novamente.');
                window.location.hash = '#/login';
                return;
            }

            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailGuardado,
                    token: code
                })
            });

            const resultado = await response.json();

            if (!response.ok) {
                throw new Error(resultado.error || 'Erro na verificação.');
            }

            console.log('Autenticação bem-sucedida via backend!', resultado);
            
            if (resultado.session) {
                localStorage.setItem('token', resultado.session.access_token);
            }

            sessionStorage.removeItem('auth_email');

            // Redireciona para o dashboard do administrador
            window.location.hash = '#/dashboard-administrador'; 

        } catch (error) {
            console.error('Erro na verificação do código:', error.message);
            alert('Código inválido ou expirado. Tente novamente.');
            
            inputs.forEach(input => input.value = '');
            inputs[0].focus();
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Funcionalidade do botão Reenviar código ligada ao backend (/api/auth/send-otp)
    btnReenviar.addEventListener('click', async () => {
        const emailGuardado = sessionStorage.getItem('auth_email');
        if (!emailGuardado) {
            alert('E-mail não encontrado na sessão. Por favor, reinicie o processo.');
            return;
        }

        try {
            btnReenviar.textContent = 'A reenviar...';
            btnReenviar.disabled = true;

            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailGuardado })
            });

            const resultado = await response.json();

            if (!response.ok) {
                throw new Error(resultado.error || 'Erro ao reenviar o código.');
            }

            alert('Novo código/link de acesso enviado com sucesso para o seu e-mail!');
        } catch (error) {
            console.error('Erro ao reenviar:', error.message);
            alert('Não foi possível reenviar o código: ' + error.message);
        } finally {
            btnReenviar.textContent = 'Reenviar código';
            btnReenviar.disabled = false;
        }
    });
}