# 🧾 Nuvei Integration – Next.js + TailwindCSS

> 🚀 Proyecto de integración con Nuvei utilizando **Next.js**, **TailwindCSS** y **Bun**.  
> Este repositorio permite procesar pagos mediante la plataforma Nuvei con un flujo seguro y escalable.

---

## 🖼️ Vista previa del proyecto

_Agrega aquí la URL de una imagen o screenshot del proyecto_

`👉 [Pon aquí la URL de la imagen]`

---

## 📌 Descripción

_Describe aquí tu proyecto, propósito y beneficios_

`👉 [Agrega una breve descripción del proyecto]`

---

## 🔧 Tecnologías utilizadas

| Tecnología       | Uso                                          |
| ---------------- | -------------------------------------------- |
| **Next.js**      | Framework React para el frontend y backend   |
| **TailwindCSS**  | Estilos con clases utilitarias               |
| **Nuvei**        | Plataforma de pagos                          |
| **Bun**          | Runtime para ejecutar el proyecto más rápido |
| **DevContainer** | Entorno de desarrollo reproducible           |

---

## 🚀 Requisitos previos

🔹 Tener instalado **Docker** (para usar el DevContainer)  
🔹 Tener instalado **Bun** localmente si vas a ejecutar sin DevContainer  
🔹 Claves de integración de **Nuvei**

---

## 🔑 Variables de entorno necesarias

Crea un archivo `.env.local` en la raíz del proyecto con lo siguiente:

```bash
NEXT_PUBLIC_NUVEI_ENV="stg" # prod
NEXT_PUBLIC_NUVEI_APPLICATION_CODE=""
NEXT_PUBLIC_NUVEI_APPLICATION_KEY=""
```

## 📥 Instalación de dependencias

🟢 Usando Bun (recomendado)

```bash
bun install
```

🔵 Usando npm (opcional)

```bash
npm install
```

🟣 Usando yarn (opcional)

```bash
yarn install
```

⚠️ Si usas Bun, no mezcles gestores (npm/yarn) en el mismo proyecto para evitar conflictos.

## ▶️ Ejecutar en local sin DevContainer

```bash
bun run dev
```

Luego abre en el navegador:

```bash
http://localhost:3000
```
