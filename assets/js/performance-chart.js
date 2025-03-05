// Configuration du graphique de performance
document.addEventListener('DOMContentLoaded', function() {
    // Contexte du canvas
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // Données initiales (sans la méthode Ploceus)
    const initialData = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'CRO (%)',
                data: [17, 20, 22, 21, 18, 15],
                borderColor: '#4F46E5', // Indigo
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'LTV (€)',
                data: [12.0, 12.5, 12.2, 13.0, 12.8, 12.1],
                borderColor: '#10B981', // Vert émeraude
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'CAC (€)',
                data: [35, 34, 36, 33, 34, 38],
                borderColor: '#EF4444', // Rouge
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    // Données améliorées (avec la méthode Ploceus)
    const improvedData = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'CRO (%)',
                data: [17, 21, 28, 35, 42, 48], // +92% d'amélioration
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'LTV (€)',
                data: [12.0, 15.2, 17.8, 20.5, 24.3, 32.4], // +40% d'amélioration
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'CAC (€)',
                data: [35, 34, 36, 30, 25, 22], // -31% d'amélioration
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    // Options du graphique
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            if (label.includes('CRO')) {
                                label += context.parsed.y + '%';
                            } else {
                                label += context.parsed.y + '€';
                            }
                        }
                        return label;
                    }
                }
            },
            legend: {
                position: 'top',
                labels: {
                    color: '#fff',
                    font: {
                        family: 'Inter, sans-serif'
                    }
                }
            },
            title: {
                display: true,
                text: 'Performance e-commerce sans la méthode Ploceus 👨‍🦯',
                color: '#fff',
                font: {
                    family: 'Inter, sans-serif',
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#9CA3AF'
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#9CA3AF'
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    };
    
    // Création du graphique
    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: initialData,
        options: chartOptions
    });
    
    // Gestion du bouton de toggle
    const toggleButton = document.getElementById('toggleMethod');
    //const methodStatus = document.getElementById('methodStatus');
    let isImproved = false;
    
    // Auto-click after 2 seconds (only once)
    setTimeout(() => {
        if (!isImproved) {
            toggleButton.click();
        }
    }, 3000);

    toggleButton.addEventListener('click', function() {
        isImproved = !isImproved;
        
        if (isImproved) {
            // Update chart data
            performanceChart.options.plugins.title.text = 'Performance e-commerce avec la méthode Ploceus 🤑';
            performanceChart.data = improvedData;
            
            // Update button and status
            toggleButton.textContent = 'Voir sans la méthode Ploceus 😬';
            toggleButton.classList.remove('bg-white', 'text-black');
            toggleButton.classList.add('bg-indigo-600', 'text-white');
            /*
            methodStatus.textContent = 'Avec la méthode Ploceus 📈';
            methodStatus.classList.remove('bg-gray-800');
            methodStatus.classList.add('bg-indigo-900');
            */
            // Update metric values
            document.querySelector('.metric-card:nth-child(1) .metric-value').textContent = '4.8%';
            document.querySelector('.metric-card:nth-child(2) .metric-value').textContent = '32€';
            document.querySelector('.metric-card:nth-child(3) .metric-value').textContent = '22€';
            
            // Show improvements
            document.querySelectorAll('.improvement').forEach(el => {
                el.classList.remove('hidden');
            });
        } else {
            // Update chart data
            performanceChart.options.plugins.title.text = 'Performance e-commerce sans la méthode Ploceus 👨‍🦯';
            performanceChart.data = initialData;
            
            // Update button and status
            toggleButton.textContent = 'Voir avec la méthode Ploceus 🚀';
            toggleButton.classList.remove('bg-indigo-600', 'text-white');
            toggleButton.classList.add('bg-white', 'text-black');
            /*
            methodStatus.textContent = 'Sans la méthode Ploceus 📉';
            methodStatus.classList.remove('bg-indigo-900');
            methodStatus.classList.add('bg-gray-800');
            */
            // Update metric values
            document.querySelector('.metric-card:nth-child(1) .metric-value').textContent = '1.7%';
            document.querySelector('.metric-card:nth-child(2) .metric-value').textContent = '12€';
            document.querySelector('.metric-card:nth-child(3) .metric-value').textContent = '32€';
            
            // Hide improvements
            document.querySelectorAll('.improvement').forEach(el => {
                el.classList.add('hidden');
            });
        }
        
        performanceChart.update();
    });
    
    // Initialisation des tooltips
    const tooltip = document.getElementById('buttonTooltip');
    toggleButton.addEventListener('mouseenter', function() {
        tooltip.classList.remove('hidden');
    });
    toggleButton.addEventListener('mouseleave', function() {
        tooltip.classList.add('hidden');
    });
}); 