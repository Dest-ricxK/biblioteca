document.addEventListener('DOMContentLoaded', () => {
    const favoriteButtons = document.querySelectorAll('.favorite-btn'); // Obtiene todos los botones "Agregar a Favoritos"
    const favoritesList = document.getElementById('favoritesList'); // Lista donde se mostrarán los favoritos

    // Función para agregar un libro a favoritos
    function addToFavorites(bookElement) {
        const bookTitle = bookElement.querySelector('h3').innerText;
        const bookId = bookElement.id; // Usamos el ID del libro para identificarlo de forma única
        const bookAuthor = bookElement.querySelector('.description').innerText.split(": ")[1];
        
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
        });
        // Agregar el botón de eliminar al elemento de la lista
        listItem.appendChild(removeButton);
        

        const existingBooks = Array.from(favoritesList.children);
        const isAlreadyFavorite = existingBooks.some(item => item.innerText.includes(bookTitle));
        if (isAlreadyFavorite) {
            const favoriteButton = bookElement.querySelector('.favorite-btn');
            favoriteButton.disabled = false; // Deshabilitar el botón
            favoriteButton.innerText = '★';
        } else {
            const favoriteButton = bookElement.querySelector('.favorite-btn');
            favoriteButton.disabled = true; // Deshabilitar el botón
            favoriteButton.innerText = '★'; // La estrella no cambiará de aspecto
        }
    }

    // Añadir evento click a cada botón de "Agregar a Favoritos"
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const bookElement = event.target.closest('.book'); // Encontramos el contenedor del libro
            addToFavorites(bookElement);
        });
    });

    favoritesToggle.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar que el enlace haga su comportamiento predeterminado
        const isVisible = favoritesContainer.style.display === 'block';
        favoritesContainer.style.display = isVisible ? 'none' : 'block'; // Alterna la visibilidad
    });
});

// Modo oscuro
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Guardar el estado del modo oscuro en el localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Al cargar la página, configurar el modo oscuro si está guardado en localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
