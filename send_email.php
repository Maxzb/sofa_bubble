<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Настройки
$smtp_host = 'ssl://smtp.yandex.ru'; // или 'tls://smtp.yandex.ru'
$smtp_port = 465; // для SSL, для TLS используйте 587
$smtp_username = 'maxzb86@yandex.ru'; // ваш Яндекс email
$smtp_password = 'jlmwqlsysofbhios'; // пароль приложения, не основной пароль!
$from_email = 'maxzb86@yandex.ru'; // email отправителя
$to_email = 'maxzb86@yandex.ru'; // куда отправлять заявки

// Ответ для клиента
$response = ['success' => false, 'message' => ''];

try {
    // Проверка на спам (honeypot)
    if (!empty($_POST['website'])) {
        throw new Exception('Спам-заявка отклонена');
    }

    // Валидация данных
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');

    if (empty($name) || empty($phone)) {
        throw new Exception('Все поля обязательны для заполнения');
    }

    // Проверка длины имени
    if (strlen($name) < 2) {
        throw new Exception('Имя должно содержать минимум 2 символа');
    }

    // Очистка данных
    $name = htmlspecialchars($name);
    $phone = htmlspecialchars($phone);

    // Создание PHPMailer
    $mail = new PHPMailer(true);
    
    // Настройки сервера
    $mail->isSMTP();
    $mail->Host = $smtp_host;
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_username;
    $mail->Password = $smtp_password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // или PHPMailer::ENCRYPTION_STARTTLS для TLS
    $mail->Port = $smtp_port;
    
    // Кодировка
    $mail->CharSet = 'UTF-8';
    
    // Отправитель и получатель
    $mail->setFrom($from_email, 'SofaShop');
    $mail->addAddress($to_email);
    $mail->addReplyTo($from_email, 'SofaShop');
    
    // Тема и тело письма
    $mail->Subject = 'Новая заявка с сайта SofaShop';
    
    $body = "
    <html>
    <head>
        <title>Новая заявка</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 15px; border-radius: 5px; }
            .field { margin: 10px 0; padding: 10px; background: #f8f9fa; }
            .label { font-weight: bold; color: #333; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Новая заявка с сайта SofaShop.ru</h2>
            </div>
            <div class='field'>
                <span class='label'>Имя:</span> {$name}
            </div>
            <div class='field'>
                <span class='label'>Телефон:</span> {$phone}
            </div>
            <div class='field'>
                <span class='label'>Дата:</span> " . date('d.m.Y H:i') . "
            </div>
        </div>
    </body>
    </html>
    ";
    
    $mail->isHTML(true);
    $mail->Body = $body;
    
    // Альтернативное текстовое тело для почтовых клиентов, которые не поддерживают HTML
    $mail->AltBody = "Новая заявка с сайта:\n\nИмя: {$name}\nТелефон: {$phone}\nДата: " . date('d.m.Y H:i');
    
    // Отправка письма
    if ($mail->send()) {
        $response['success'] = true;
        $response['message'] = 'Наш менеджер свяжется с вами в ближайшее время';
    } else {
        throw new Exception('Ошибка при отправке письма: ' . $mail->ErrorInfo);
    }
    
} catch (Exception $e) {
    $response['message'] = 'Произошла ошибка: ' . $e->getMessage();
    error_log('Form Error: ' . $e->getMessage()); // Логирование ошибок
}

// Возвращаем ответ в формате JSON
header('Content-Type: application/json');
echo json_encode($response);
?>