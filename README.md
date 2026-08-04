# 💊 InnovaPharm - Sistema Digital de Recetas Médicas

> **Aplicación web/móvil híbrida y panel administrativo para la digitalización, gestión y validación de recetas médicas en el Consultorio Raúl Brañes Farmer de San Bernardo.**

---

## 📌 Tabla de Contenidos
- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Problemática y Solución](#-problemática-y-solución)
- [Características Principales](#-características-principales)
- [Arquitectura y Tecnologías](#-arquitectura-y-tecnologías)
- [Metodología de Desarrollo](#-metodología-de-desarrollo)
- [Aseguramiento de Calidad y Normativas](#-aseguramiento-de-calidad-y-normativas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Contacto / Autores](#-contacto--autores)

---

## 📖 Acerca del Proyecto

**InnovaPharm** es una solución tecnológica desarrollada con principios de Ingeniería de Software orientada a optimizar el ciclo completo de prescripción, trazabilidad y dispensación de medicamentos en el sistema de salud pública local.

El sistema resuelve las ineficiencias del manejo en papel mediante un ecosistema digital compuesto por una **App Híbrida Multiplataforma** para Pacientes, Médicos y Farmacéuticos, complementada con un **Panel Administrativo en Django** para la gestión centralizada de usuarios y métricas.

---

## ⚠️ Problemática y Solución

| Problemática Actual (Papel) | Solución InnovaPharm |
| :--- | :--- |
| Pérdida, deterioro o rotura de recetas físicas. | Recetas digitales almacenadas y accesibles 24/7[cite: 1]. |
| Falsificación de firmas y recetas vencidas[cite: 1]. | Validación mediante **Código QR único** y control de estados[cite: 1]. |
| Errores de transcripción y legibilidad de letra[cite: 1]. | Formularios estandarizados e interfaz intuitiva[cite: 1]. |
| Falta de trazabilidad en la entrega de medicamentos[cite: 1]. | Historial centralizado para el médico, farmacéutico y paciente[cite: 1]. |

---

## ✨ Características Principales

El sistema maneja un control de acceso basado en roles (**RBAC**):

* **👤 Paciente:**
  * Visualización y filtrado de recetas médicas activas e históricas[cite: 1].
  * Generación de código QR para validación directa en farmacia[cite: 1].
  * Notificaciones de vencimiento y estados[cite: 1].
  * Opciones de accesibilidad (modo oscuro, ajuste de tamaño de texto)[cite: 1].

* **👨‍⚕️ Médico:**
  * Emisión, firma electrónica y anulación/actualización de recetas[cite: 1].
  * Descarga de recetas en formato PDF[cite: 1].
  * Búsqueda y consulta de historial clínico de prescripciones[cite: 1].

* **💊 Farmacéutico:**
  * Escaneo de QR o búsqueda por código único de receta[cite: 1].
  * Validación rápida e interfaz para marcar recetas como "Revisadas/Entregadas"[cite: 1].

* **⚙️ Administrador (Django Admin):**
  * Creación y gestión masiva de usuarios y roles[cite: 1].
  * Generación automática de credenciales seguras[cite: 1].
  * Dashboard con métricas de rendimiento y uso de la plataforma[cite: 1].

---

## 🛠️ Arquitectura y Tecnologías

### **Frontend & App Híbrida**
* **Ionic Framework + Angular:** Base de código única para Android/iOS y Web[cite: 1].
* **Figma:** Prototipado UX/UI UI/UX centrado en accesibilidad (adultos mayores)[cite: 1].

### **Backend, Base de Datos y Autenticación**
* **Django:** Panel administrativo, gestión de usuarios y API[cite: 1].
* **Firebase:** Autenticación segura y almacenamiento mediante RUT/RUN[cite: 1].

### **Calidad y Testing**
* **Apache JMeter:** Pruebas de carga, rendimiento y estrés[cite: 1].
* **Git & GitHub:** Control de versiones[cite: 1].

---

## 🔄 Metodología de Desarrollo

El proyecto se ejecutó utilizando la metodología ágil **Scrum**, organizada en **5 Sprints de 2 semanas cada uno**[cite: 1]:

* **Sprint 1:** Configuración inicial, arquitectura y autenticación[cite: 1].
* **Sprint 2:** Gestión de datos del paciente y generación de QR[cite: 1].
* **Sprint 3:** Módulo de prescripción y desarrollo de recetas digitales[cite: 1].
* **Sprint 4:** Módulo de visualización, filtros e historial[cite: 1].
* **Sprint 5:** Integración general, sistema de notificaciones, pruebas y cierre[cite: 1].

---

## 🛡️ Aseguramiento de Calidad y Normativas

El desarrollo fue guiado bajo los criterios de la norma **ISO/IEC 25010**[cite: 1], garantizando:

* **Seguridad:** Cifrado de datos sensibles (RUT, firmas, historial médico)[cite: 1], cierre automático de sesión por inactividad y bloqueo tras intentos fallidos[cite: 1].
* **Rendimiento:** Tiempos de carga $\le 4\text{s}$ en redes móviles (4G) y disponibilidad meta de $\ge 95\%$[cite: 1].
* **Usabilidad:** Diseño responsivo, validaciones dinámicas de formularios y mensajes de error claros[cite: 1].

---

## 📁 Estructura del Repositorio

```text
├── innovapharm-frontend/    # Proyecto Ionic + Angular (App Paciente, Médico, Farmacia)
├── innovapharm-backend/     # Panel de Administración en Django
├── docs/                    # Documentación técnica, diagramas y casos de prueba
└── README.md
