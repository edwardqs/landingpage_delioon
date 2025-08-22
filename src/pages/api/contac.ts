// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';

// Configurar SendGrid
sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nombre, email, empresa, categoria, producto, mensaje } = body;

    // Validación básica
    if (!nombre || !email || !mensaje || !categoria || !producto) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Todos los campos requeridos deben ser completados' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Email inválido' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Crear el mensaje de email
    const msg = {
      to: 'esquispes01@gmail.com',
      from: import.meta.env.FROM_EMAIL || 'noreply@delionperu.com', // Email verificado en SendGrid
      replyTo: email,
      subject: `Nuevo contacto de ${nombre} - ${categoria}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0C3C6F; border-bottom: 2px solid #0C3C6F; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Información del contacto:</h3>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
            <p><strong>Categoría:</strong> ${categoria}</p>
            <p><strong>Producto:</strong> ${producto}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #0C3C6F; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #555;">${mensaje.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Este mensaje fue enviado desde el formulario de contacto de Delion Peru.</p>
            <p>Fecha: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
          </div>
        </div>
      `
    };

    // Enviar email
    await sgMail.send(msg);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Mensaje enviado correctamente' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Error interno del servidor' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};