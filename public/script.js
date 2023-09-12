document.addEventListener('DOMContentLoaded', () => {
    const sobreMiSection = document.getElementById('about');
    const cambiarColorBtn = document.getElementById('cambiarColorBtn');

    cambiarColorBtn.addEventListener('click', () => {
        // Cambia el color de fondo de la sección "Sobre Mí"
        sobreMiSection.style.backgroundColor = getRandomColor();
    });

    // Función para obtener un color aleatorio
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
