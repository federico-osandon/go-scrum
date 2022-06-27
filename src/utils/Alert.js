import Swal from 'sweetalert2'

export const swalAlert = () =>  Swal.fire({
                                title: 'Credenciales Inválidas',
                                text: 'Por favor, verifique sus credenciales',
                                confirmButtonText: 'Aceptar',
                                width: '400px',
                                timer: 10000,
                                timerProgressBar: true
                            })


