# Sistema de Control de Conveyor con RFID para Distribución de Premios

## Descripción

Este proyecto integra la tecnología RFID y control de actuadores para automatizar un sistema de conveyor, facilitando la distribución automatizada de premios en eventos. Utilizando el lector RFID Zebra FX9600, el scanner FS40, y el actuador ADAM-6000, se desarrolló un sistema capaz de identificar tarjetas RFID únicas de una lista predefinida de invitados, activando el conveyor para entregar premios específicos. La conexión con el FS40 se realiza a través de sockets, mientras que con el ADAM-6000 se utiliza el protocolo Modbus, demostrando una interesante integración de tecnologías.

### Componentes del Sistema

- **Lector RFID Zebra FX9600 y Scanner FS40**: Utilizados para la identificación de los participantes mediante tecnología RFID.
- **Actuador ADAM-6000**: Controla el movimiento del conveyor, integrado mediante protocolo Modbus.
- **Conveyor**: Mecanismo físico utilizado para transportar y entregar premios a los participantes.

## Flujo del Proyecto

### Identificación y Registro de Invitados

Los participantes son registrados previamente en el sistema con su información personal junto a un código RFID único. Esta preparación es esencial para el procedimiento de validación durante el evento.

![alt text](https://firebasestorage.googleapis.com/v0/b/invitacion-27932.appspot.com/o/Imagen%20de%20WhatsApp%202024-04-09%20a%20las%2015.48.43_af4cbac5.jpg?alt=media&token=547fb506-eee1-4dd0-957c-3e409026bf9f)

### Activación mediante RFID y FS40

Al acercar su tarjeta RFID al lector Zebra FX9600 o al scanner FS40, el sistema verifica la identidad del participante contra la lista predefinida de invitados y determina si existe un premio asignado a su identificación.

![alt text](https://firebasestorage.googleapis.com/v0/b/invitacion-27932.appspot.com/o/Imagen%20de%20WhatsApp%202024-04-09%20a%20las%2015.48.43_66de91af.jpg?alt=media&token=153b0d78-0bd2-49c1-a6ba-d22bb1a1bc10)

### Control del Conveyor y Entrega de Premios

Si la validación es exitosa, se envía una señal al actuador ADAM-6000 a través del protocolo Modbus para iniciar el conveyor. Este proceso resulta en la entrega automática del premio correspondiente al participante.

![alt text](https://firebasestorage.googleapis.com/v0/b/invitacion-27932.appspot.com/o/Sin%20t%C3%ADtulo.png?alt=media&token=0ff18c99-86dd-4ad9-a004-ab4ca574c48a)

## Tecnologías y Protocolos Utilizados

- **RFID y Scanner FS40 para identificación**: Captura la información de los participantes de manera eficiente y precisa.
- **Protocolo Modbus con ADAM-6000**: Facilita una integración robusta y confiable para el control del conveyor.
- **Sockets para comunicación con FS40**: Permite una conexión en tiempo real y bidireccional para la activación basada en eventos.

## Impacto del Proyecto

La implementación de este sistema demuestra la efectividad de combinar tecnología RFID con automatización física, mejorando significativamente la logística de eventos y la experiencia del usuario al proporcionar una entrega de premios rápida y personalizada.

## Futuras Direcciones

Este proyecto abre el camino para futuras investigaciones y desarrollos, incluyendo la integración de más tecnologías de identificación, mejora de los sistemas de control de conveyor, y la expansión hacia otras aplicaciones de automatización en eventos y beyond.

## Agradecimientos

Agradecemos a todos los participantes que asistieron, a Catherine Rodriguez representante de Bluestar, A zebra technologies y al edificio WaveTech por sus instalaciones.

