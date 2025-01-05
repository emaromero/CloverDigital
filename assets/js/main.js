/*
	Clover Digital
	
	Free for personal and commercial use under the CCA 3.0 license (https://www.instagram.com/cloverdigital.arg/)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

document.getElementById("send-btn").addEventListener("click", function () {
	const form = document.getElementById("contact-form");
	const formData = new FormData(form);
  
	const email = formData.get("email");
	const message = formData.get("message");
  
	// Validación para asegurarse de que los campos no estén vacíos
	if (!email || !message) {
	  // Muestra el modal de error si hay campos vacíos
	  document.getElementById("alert-modal").style.display = "block";
	  document.getElementById("success-modal").style.display = "none"; // Aseguramos que el modal de éxito no esté abierto
	  return; // Detiene el envío si falta algún campo
	}
  
	emailjs.send("service_q8bnf23", "template_nw9a6ff", {
	  from_name: formData.get("name"),
	  from_email: formData.get("email"),
	  message: formData.get("message"),
	})
	.then(() => {
	  // Cerramos el modal de error (si estaba abierto)
	  document.getElementById("alert-modal").style.display = "none";
	  // Mostrar el modal de éxito
	  document.getElementById("success-modal").style.display = "block";
	  form.reset(); // Resetea el formulario
	})
	.catch((error) => {
	  alert("Error al enviar el mensaje: " + error.text);
	});
  });
  
  // Cerrar el modal de alerta con el botón de cerrar
  document.querySelector(".close-btn").addEventListener("click", function () {
	document.getElementById("alert-modal").style.display = "none";
  });
  
  // Cerrar el modal de éxito con el botón de cerrar
  document.querySelector(".close-btn").addEventListener("click", function () {
	document.getElementById("success-modal").style.display = "none";
  });
  
  // Cerrar el modal de alerta o éxito con el botón "Cerrar"
  document.getElementById("close-modal-btn").addEventListener("click", function () {
	document.getElementById("alert-modal").style.display = "none";
  });
  
  document.getElementById("close-success-modal-btn").addEventListener("click", function () {
	document.getElementById("success-modal").style.display = "none";
  });
  
  // Cerrar los modales si se hace clic fuera de la ventana del modal
  window.addEventListener("click", function (event) {
	const alertModal = document.getElementById("alert-modal");
	const successModal = document.getElementById("success-modal");
  
	// Cierra el modal de alerta si el clic es fuera de su contenido
	if (event.target === alertModal) {
	  alertModal.style.display = "none";
	}
  
	// Cierra el modal de éxito si el clic es fuera de su contenido
	if (event.target === successModal) {
	  successModal.style.display = "none";
	}
  });
  