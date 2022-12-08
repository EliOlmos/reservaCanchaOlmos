const inputDni = document.getElementById("dni"),
  inputPass = document.getElementById("pass"),
  nombre = document.getElementById("nombre"),
  apellido = document.getElementById("apellido"),
  btnLogin = document.getElementById("btnLogin"),
  menuPrincipal = document.getElementById("menuPrincipal"),
  btnNuevaReserva = document.getElementById("btnNuevaReserva"),
  btnConsultarReserva = document.getElementById("btnConsultarReserva"),
  btnExit = document.getElementById("btnExit"),
  resetForm = document.getElementById("resetForm"),
  paraReservar = document.getElementById("paraReservar"),
  diaConfirmado = document.getElementById("diaConfirmado"),
  horaInicio = document.getElementById("horaInicio"),
  horaFin = document.getElementById("horaFin"),
  btnConfirmar = document.getElementById("btnConfirmar"),
  btnVolver = document.getElementById("btnVolver"),
  btnReset = document.getElementById("btnReset"),
  btnRegistrarse = document.getElementById("btnRegistrarse"),
  inicio = document.getElementById("inicioNuevo"),
  dniNuevo = document.getElementById("dniNuevo"),
  passNuevo = document.getElementById("passNuevo"),
  nombreNuevo = document.getElementById("nombreNuevo"),
  apellidoNuevo = document.getElementById("apellidoNuevo");

class Usuario {
  constructor(dni, pass, nombre, apellido, id) {
    this.dni = parseInt(dni);
    this.pass = pass;
    this.nombre = nombre;
    this.apellido = apellido;
    this.id = id;
  }

  asignarId(usuariosBD) {
    this.id = usuariosBD.length;
  }
}

const usuariosBD = [
  new Usuario(28656220, "eli28656", "Elizabeth", "Olmos", 1),
  new Usuario(25074870, "luis25074", "Luis", "Guerci", 2),
];

class Reserva {
  constructor(fechaConfirmada, horaInicio, horaFin, costo, idR) {
    this.fechaConfirmada = fechaConfirmada;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
    this.costo = 0;
    this.idR = idR;
  }

  asignarId(reservas) {
    this.idR = reservas.length;
  }
}

const reservasBD = [];

function validarUsuario(usuariosBD, dni, pass) {
  let userEncontrado = usuariosBD.find((usuario) => usuario.dni == dni);

  if (typeof userEncontrado === "undefined") {
    return false;
  } else {
    if (userEncontrado.pass != pass) {
      return false;
    } else {
      return userEncontrado;
    }
  }
}

function guardarDatos(usuariosBD, storage) {
  const usuario = {
    dni: usuariosBD.dni,
    nombre: usuariosBD.nombre,
    apellido: usuariosBD.apellido,
    pass: usuariosBD.pass,
  };
  storage.setItem("usuario", JSON.stringify(usuario));
}

function guardarReserva(reservasBD, storage) {
  const reserva = {
    fechaConfirmada: reservasBD.fechaConfirmada,
    horaInicio: reservasBD.horaInicio,
    horaFin: reservasBD.horaFin,
    costo: parseInt(1400),
  };
  storage.setItem("reserva", JSON.stringify(reserva));
}

function recuperarReserva(storage) {
  return JSON.parse(storage.getItem("reserva"));
}

function borrarDatos() {
  localStorage.clear();
  localStorage.clear();
}

function recuperarUsuario(storage) {
  return JSON.parse(storage.getItem("usuario"));
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (!inputDni.value || !inputPass.value) {
    Swal.fire({
      text: "Todos los campos deben estar completos",
      colorButton: "#fff",
      background: "rgba(162, 80, 166)",
      color: "#fff",
    });
  } else {
    let datos = validarUsuario(usuariosBD, inputDni.value, inputPass.value);
    if (datos) {
      guardarDatos(datos, localStorage);
      Swal.fire({
        position: "top-end",
        icon: "success",
        iconColor: "#fff",
        title: "Hola " + datos.nombre,
        background: "rgba(162, 80, 166)",
        color: "#fff",
        toast: true,
        showConfirmButton: false,
        timer: 3500,
      });

      document.querySelector("#inicio").style.display = "none";
      document.querySelector("#reserva").style.display = "flex";

      const inputFecha = document.querySelectorAll('input[type="date"]');
      const DateTime = luxon.DateTime;
      let fechaInicio = DateTime.now().toFormat("yyyy-MM-dd");
      let fechaFin = DateTime.now().plus({ months: 4 }).toFormat("yyyy-MM-dd");
      inputFecha.forEach((element) => {
        element.setAttribute("min", fechaInicio);
        element.setAttribute("max", fechaFin);
      });
      btnNuevaReserva.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#reserva").style.display = "none";
        document.querySelector("#paraReservar").style.display = "flex";
        const fechaConfirmada = document.querySelector("#diaConfirmado");
        const horaInicioConfirmada = document.querySelector("#horaInicio");
        const horaFinConfirmada = document.querySelector("#horaFin");
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
            body: "Te sugerimos revisar el clima antes de realizar tu reserva",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) =>
            Swal.fire({
              title: "Revisar clima",
              icon: "question",
              iconColor: "rgba(162, 80, 166",
              html: '<a target="_blank" href="https://www.accuweather.com/es/ar/c%C3%B3rdoba/8869/weather-forecast/8869">links</a> ',
              showConfirmButton: false,
              //timer:2000,
              text: data.body,
            })
          );

        btnConfirmar.addEventListener("click", (e) => {
          e.preventDefault();
          //document.querySelector("#reserva").style.display = "flex";

          if (
            !fechaConfirmada.value ||
            !horaInicioConfirmada.value ||
            !horaFinConfirmada.value
          ) {
            Swal.fire({
              text: "Todos los campos deben estar completos",
              colorButton: "#fff",
              background: "rgba(162, 80, 166)",
              color: "#fff",
            });
          } else {
            localStorage.setItem(
              "diaConfirmado",
              JSON.stringify(fechaConfirmada.value)
            );
            localStorage.setItem(
              "horaInicio",
              JSON.stringify(horaInicioConfirmada.value)
            );
            localStorage.setItem(
              "horaFin",
              JSON.stringify(horaFinConfirmada.value)
            );
            datos = [datos];

            const nuevaReserva = new Reserva(
              fechaConfirmada.value,
              horaInicioConfirmada.value,
              horaFinConfirmada.value
            );

            reservasBD.push(nuevaReserva);
            nuevaReserva.asignarId(reservasBD);

            guardarReserva(nuevaReserva, localStorage);

            const mostrarUsuario = document.querySelector("#mostrarUsuario");
            for (const iterator of datos) {
              mostrarUsuario.innerHTML = `<p class="text-center">${iterator.nombre}</p> `;
            }

            let recuperReserva = [recuperarReserva(localStorage)];
            const datosReserva = document.querySelector("#mostrarReserva");

            for (const iterator of recuperReserva) {
              document.querySelector("#paraReservar").style.display = "none";
              document.querySelector("#mostrarReserva").style.display = "flex";
              costo = (iterator.horaFin - iterator.horaInicio) * 1400;
              datosReserva.innerHTML = `<p>SE HA GENERADO LA SIGUIENTE RESERVA<br>Fecha:  ${iterator.fechaConfirmada}<br>Desde las: ${iterator.horaInicio} hs.<br>Hasta las: ${iterator.horaFin} hs.<br>El costo del alquiler será de $${costo} <br>Gracias por usar nuestro gestor de reservas</p> <br>`;
            }
            setInterval("location.reload()", 15000);
          }
        });

        btnConsultarReserva.addEventListener("click", (e) => {
          e.preventDefault();

          //traer la reserva del storage
        });
      });
      btnExit.addEventListener("click", (e) => {
        e.preventDefault();

        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "#fff",
          text: datos.nombre + " volvé pronto",
          toast: true,
          background: "rgba(162, 80, 166)",
          color: "#fff",
          showConfirmButton: false,
          timer: 3500,
        });
        document.querySelector("#reserva").style.display = "none";
        document.querySelector("#inicio").style.display = "flex";
        setTimeout(resetForm.reset(), 3501);
        borrarDatos();
      });
    } else {
      Swal.fire({
        text: "usuario y/o contraseña inválida",
        background: "rgba(162, 80, 166)",
        color: "#fff",
      });
      document.querySelector("#inicio").style.display = "none";
      document.querySelector("#loginIncorrecto").style.display = "flex";
      btnRegistrarse.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#datoUsuarioNuevo").style.display = "flex";

        const usuarioNuevo = new Usuario(
          dniNuevo.value,
          passNuevo.value,
          nombreNuevo.value,
          apellidoNuevo.value
        );

        usuariosBD.push(usuarioNuevo);
        usuarioNuevo.asignarId(usuariosBD);

        guardarDatos(usuarioNuevo, localStorage);

        let usuarioRecuperado = [recuperarUsuario(localStorage)];
        let datosNuevos = document.querySelector("#datoUsuarioNuevo");
        if (
          !dniNuevo.value ||
          !passNuevo.value ||
          !nombreNuevo.value ||
          !apellidoNuevo.value
        ) {
          document.querySelector("#loginIncorrecto").style.display = "none";
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Te falta completar datos",
            background: "rgba(162, 80, 166)",
            color: "#fff",
          });
        } else {
          for (const elemento of usuarioRecuperado) {
            datosNuevos.innerHTML = `<p>¡Te registraste con éxito!<br>Tus datos son:<br>Nombre: ${elemento.nombre}<br>Apellido: ${elemento.apellido}<br>D.N.I. N°: ${elemento.dni}<br><b>¡BIENVENID@!</b></p> `;
          }
        }
      });
    }
  }
});
