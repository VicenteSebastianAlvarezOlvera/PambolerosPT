// Guarda el menú actualmente abierto
var openMenu = null;

function openPlayerMenu(position) {
    // Si hay un menú abierto, ocúltalo
    if (openMenu) {
        openMenu.style.display = 'none';
    }

    // Muestra el menú del jugador seleccionado
    var menu = document.getElementById(position + '-menu');
    menu.style.display = 'block';

    // Guarda el menú abierto
    openMenu = menu;
}

function selectPlayer(position, player) {
    var menu = document.getElementById(position + '-menu');
    menu.style.display = 'none';
    alert('Has seleccionado a ' + player + ' como ' + position);

    // No hay ningún menú abierto
    openMenu = null;
}

// Cuando se hace clic en el documento
document.addEventListener('click', function(event) {
    // Si se hizo clic fuera del menú abierto y del botón que lo abre, oculta el menú
    if (openMenu && !openMenu.contains(event.target) && !openMenu.previousElementSibling.isSameNode(event.target)) {
        openMenu.style.display = 'none';
        openMenu = null;
    }
});
