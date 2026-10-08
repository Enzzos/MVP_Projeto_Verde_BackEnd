// Sistema de Agendamento - Circuito Terê Verde
class AgendaSystem {
    constructor() {
        this.selectedDate = null;
        this.selectedTrilha = null;
        this.selectedHorario = null;
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.trilhas = [
            {
                id: 1,
                nome: "Pedra do Sino",
                duracao: "10 a 14 horas",
                dificuldade: "Pesada",
                preco: "R$ 10",
                horarios: ["06:00", "07:00"]
            },
            {
                id: 2,
                nome: "Mirante Cartão Postal",
                duracao: "2-3 horas",
                dificuldade: "Leve/Moderado",
                preco: "R$ 10",
                horarios: ["08:00", "10:00", "14:00", "16:00"]
            },
            {
                id: 3,
                nome: "Trilha Primavera",
                duracao: "1-2 horas",
                dificuldade: "Leve",
                preco: "R$ 10",
                horarios: ["09:00", "11:00", "14:00", "16:00"]
            },
            {
                id: 4,
                nome: "Cachoeira Véu da Noiva",
                duracao: "3-4 horas",
                dificuldade: "Leve/Moderado",
                preco: "R$ 10",
                horarios: ["08:00", "10:00", "14:00"]
            },
            {
                id: 5,
                nome: "Poço Dois Irmãos",
                duracao: "+-1 hora",
                dificuldade: "Leve",
                preco: "R$ 10",
                horarios: ["09:00", "11:00", "13:00", "15:00", "17:00"]
            },
            {
                id: 6,
                nome: "Poço do Castelo",
                duracao: "+-1 hora",
                dificuldade: "Leve",
                preco: "R$ 10",
                horarios: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
            }
        ];
        this.init();
    }
/* marca D'agua Fnsso F4jiga */
    init() {
        this.setupMonthNavigation();
        this.generateCalendar();
        this.setupEventListeners();
    }

    setupMonthNavigation() {
        const monthSelect = document.getElementById('month-select');
        const yearSelect = document.getElementById('year-select');
        const prevBtn = document.getElementById('prev-month');
        const nextBtn = document.getElementById('next-month');
        
        // Preencher anos (atual + 2 anos)
        for (let year = this.currentYear; year <= this.currentYear + 2; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
        
        // Definir valores atuais
        monthSelect.value = this.currentMonth;
        yearSelect.value = this.currentYear;
        
        // Event listeners
        monthSelect.addEventListener('change', () => {
            this.currentMonth = parseInt(monthSelect.value);
            this.generateCalendar();
        });
        
        yearSelect.addEventListener('change', () => {
            this.currentYear = parseInt(yearSelect.value);
            this.generateCalendar();
        });
        
        prevBtn.addEventListener('click', () => {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--;
            }
            this.updateSelectors();
            this.generateCalendar();
        });
        
        nextBtn.addEventListener('click', () => {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else {
                this.currentMonth++;
            }
            this.updateSelectors();
            this.generateCalendar();
        });
    }
    
    updateSelectors() {
        document.getElementById('month-select').value = this.currentMonth;
        document.getElementById('year-select').value = this.currentYear;
    }

    generateCalendar() {
        const calendar = document.getElementById('calendar');
        const today = new Date();
        
        // Limpar calendário
        calendar.innerHTML = '';

        // Cabeçalho dos dias da semana
        const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        weekDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.textContent = day;
            dayHeader.style.fontWeight = 'bold';
            dayHeader.style.textAlign = 'center';
            dayHeader.style.padding = '10px';
            dayHeader.style.background = '#f5f5f5';
            dayHeader.style.borderRadius = '10px';
            calendar.appendChild(dayHeader);
        });

        // Gerar dias do mês
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

        // Dias vazios no início
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            calendar.appendChild(emptyDay);
        }

        // Dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.className = 'calendar-day';
            
            const dayDate = new Date(this.currentYear, this.currentMonth, day);
            
            if (dayDate < today) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.classList.add('available');
                dayElement.addEventListener('click', () => this.selectDate(dayDate, dayElement));
            }

            calendar.appendChild(dayElement);
        }
    }

    selectDate(date, element) {
        // Remove seleção anterior
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });

        // Adiciona nova seleção
        element.classList.add('selected');
        this.selectedDate = date;

        // Mostra trilhas disponíveis
        this.showTrilhas();
    }

    showTrilhas() {
        const trilhasSection = document.getElementById('trilhas-section');
        const trilhasGrid = document.getElementById('trilhas-grid');
        
        trilhasGrid.innerHTML = '';
        
        this.trilhas.forEach(trilha => {
            const trilhaCard = document.createElement('div');
            trilhaCard.className = 'trilha-card';
            trilhaCard.innerHTML = `
                <h3>${trilha.nome}</h3>
                <div class="trilha-info">
                    <p>⏱️ Duração: ${trilha.duracao}</p>
                    <p>🏋️ Dificuldade: ${trilha.dificuldade}</p>
                    <p>💰 Preço: ${trilha.preco}</p>
                </div>
                <div class="horarios">
                    ${trilha.horarios.map(horario => 
                        `<button class="horario-btn" data-trilha="${trilha.id}" data-horario="${horario}">${horario}</button>`
                    ).join('')}
                </div>
            `;
            
            trilhaCard.addEventListener('click', (e) => {
                if (e.target.classList.contains('horario-btn')) {
                    this.selectTrilhaHorario(trilha, e.target.dataset.horario, trilhaCard, e.target);
                }
            });
            
            trilhasGrid.appendChild(trilhaCard);
        });
        
        trilhasSection.style.display = 'block';
    }

    selectTrilhaHorario(trilha, horario, cardElement, horarioBtn) {
        // Remove seleções anteriores
        document.querySelectorAll('.trilha-card.selected').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelectorAll('.horario-btn.selected').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Adiciona novas seleções
        cardElement.classList.add('selected');
        horarioBtn.classList.add('selected');
        
        this.selectedTrilha = trilha;
        this.selectedHorario = horario;

        // Mostra formulário de reserva
        this.showBookingForm();
    }

    showBookingForm() {
        const bookingSection = document.getElementById('booking-section');
        const bookingSummary = document.getElementById('booking-summary');
        
        const dateStr = this.selectedDate.toLocaleDateString('pt-BR');
        
        bookingSummary.innerHTML = `
            <h4>📋 Resumo da Reserva</h4>
            <p><strong>Data:</strong> ${dateStr}</p>
            <p><strong>Trilha:</strong> ${this.selectedTrilha.nome}</p>
            <p><strong>Horário:</strong> ${this.selectedHorario}</p>
            <p><strong>Duração:</strong> ${this.selectedTrilha.duracao}</p>
            <p><strong>Preço:</strong> ${this.selectedTrilha.preco} por pessoa</p>
        `;
        
        // Preencher dados do usuário logado
        this.fillUserData();
        
        bookingSection.style.display = 'block';
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }

    fillUserData() {
        if (localStorage.getItem('userLoggedIn') === 'true') {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            
            if (currentUser.nome) document.getElementById('nome').value = currentUser.nome;
            if (currentUser.email) document.getElementById('email').value = currentUser.email;
            if (currentUser.telefone) document.getElementById('telefone').value = currentUser.telefone;
        }
    }

    setupEventListeners() {
        const bookingForm = document.getElementById('booking-form');
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitBooking();
        });
    }

    submitBooking() {
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            pessoas: document.getElementById('pessoas').value,
            data: this.selectedDate.toLocaleDateString('pt-BR'),
            trilha: this.selectedTrilha.nome,
            horario: this.selectedHorario,
            preco: this.selectedTrilha.preco
        };

        // Salvar no localStorage (simulação de banco de dados ja que me impediram de mexer com MongoDB)

        //fiz mas não faço ideia de como eu fiz, eu sei explicar, eu soube fazer, mas não me peça para melhorar, caso seja teimoso 
        // e queira tentar perder seu tempo mexendo nesse projeto de cache de banco de dados, por favor contribua para quantidade de 
        // horas gastas aqui, desde já, agradeço
        // Tempo perdido nessa função: 2 horas
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
        agendamentos.push({
            ...formData,
            id: Date.now(),
            status: 'confirmado',
            dataReserva: new Date().toISOString()
        });
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        // Mostrar modal de sucesso
        this.showSuccessModal();
    }

    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
    
    // Reset form
    document.getElementById('booking-form').reset();
    document.getElementById('booking-section').style.display = 'none';
    document.getElementById('trilhas-section').style.display = 'none';
    
    // Remove seleções
    document.querySelectorAll('.selected').forEach(el => {
        el.classList.remove('selected');
    });
}

// Inicializar sistema quando página carregar
document.addEventListener('DOMContentLoaded', () => {
    new AgendaSystem();
});