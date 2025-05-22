const SUPABASE_URL = 'https://cvckiumtfyjglaxpdfwq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2tpdW10ZnlqZ2xheHBkZndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2ODE1MzgsImV4cCI6MjA1OTI1NzUzOH0.HIt6eubBfqryN6cqxeSewpctD4zD-zqgod8CN36TthU';

// Corrigindo a inicialização do cliente Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('contactForm');
const submitBtn = document.querySelector('.submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    try {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        const { data, error } = await supabaseClient
            .from('contatos')
            .insert([
                { nome, email, telefone }
            ]);

        if (error) throw error;

        // Animação de sucesso
        submitBtn.classList.add('success');
        
        // Limpar formulário
        form.reset();
        
        // Resetar botão após 2 segundos
        setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);

    } catch (error) {
        console.error('Erro:', error.message);
        submitBtn.classList.add('error');
        
        setTimeout(() => {
            submitBtn.classList.remove('error');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 1000);
    }
}); 