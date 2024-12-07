document.addEventListener('DOMContentLoaded', () => {
    const favoriteButtons = document.querySelectorAll('.favorite-btn'); // Obtiene todos los botones "Agregar a Favoritos"
    const favoritesList = document.getElementById('favoritesList'); // Lista donde se mostrarán los favoritos

    // Función para agregar un libro a favoritos
    function addToFavorites(bookElement) {
        const bookTitle = bookElement.querySelector('h3').innerText;
        const bookId = bookElement.id; // Usamos el ID del libro para identificarlo de forma única
        const bookAuthor = bookElement.querySelector('.description').innerText.split(": ")[1];
        
        // Verificar si el libro ya está en la lista de favoritos
        const existingBooks = Array.from(favoritesList.children);
        const isAlreadyFavorite = existingBooks.some(item => item.innerText.includes(bookTitle));

        // Si el libro ya está en favoritos, deshabilitar el botón
        const favoriteButton = bookElement.querySelector('.favorite-btn');
        if (isAlreadyFavorite) {
            favoriteButton.disabled = true;
            favoriteButton.innerText = '☆'; 
        } else {
            favoriteButton.disabled = false;
            favoriteButton.innerText = '★'; 
        }

        // Si el libro no está en favoritos, agregarlo
        if (!isAlreadyFavorite) {
            // Crear un nuevo elemento de lista con el título del libro
            const listItem = document.createElement('li');
            listItem.innerText = `${bookTitle} - ${bookAuthor}`;

            // Agregarlo a la lista de favoritos
            favoritesList.appendChild(listItem);

            // Crear el botón de eliminar
            const removeButton = document.createElement('button');
            removeButton.innerText = "🗑";
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => {
                listItem.remove(); // Elimina el libro de la lista de favoritos
                favoriteButton.disabled = false; // Habilitar el botón de favorito nuevamente
                favoriteButton.innerText = '☆'; // Cambiar el texto del botón
            });
            // Agregar el botón de eliminar al elemento de la lista
            listItem.appendChild(removeButton);
        }
    }

    // Añadir evento click a cada botón de "Agregar a Favoritos"
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const bookElement = event.target.closest('.book'); // Encontramos el contenedor del libro
            addToFavorites(bookElement);
        });
    });

    // Función para alternar la visibilidad de la lista de favoritos
    favoritesToggle.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar que el enlace haga su comportamiento predeterminado
        const isVisible = favoritesContainer.style.display === 'block';
        favoritesContainer.style.display = isVisible ? 'none' : 'block'; // Alterna la visibilidad
    });
});

// Selección de elementos
const darkModeToggle = document.getElementById('darkModeToggle');
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');
const modeText = document.getElementById('modeText');
const headers = document.getElementById('headers');
const footer = document.getElementById('pie');

// Función para alternar entre modos
const toggleDarkMode = () => {
    // Alternar entre el modo oscuro y claro en el body
    document.body.classList.toggle('dark-mode');
    
    // Ajustar íconos y texto
    if (document.body.classList.contains('dark-mode')) {
        moonIcon.style.display = 'inline';
        sunIcon.style.display = 'none';
        modeText.textContent = 'Modo Oscuro';
        
        // Cambiar color de los encabezados y pie de página cuando esté en modo oscuro
        headers.style.color = '#ffffff';
        footer.style.color = 'rgb(7, 6, 6)';
    } else {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline';
        modeText.textContent = 'Modo Claro';
        
        // Cambiar color de los encabezados y pie de página cuando esté en modo claro
        headers.style.color = 'rgb(7, 6, 6)';
        footer.style.color = '#ffffff';
    }
};

// Evento de clic para activar/desactivar modo oscuro
darkModeToggle.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    toggleDarkMode();
});

// Evento adicional en el texto del modo
modeText.addEventListener('click', () => {
    modeText.classList.toggle('style'); 
});
