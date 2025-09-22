<?php
// send_email.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Проверка на спам (скрытое поле должно быть пустым)
    if (!empty($_POST['website'])) {
        die('Спам-обнаружен');
    }
    
    // Получение данных из формы
    $name = strip_tags(trim($_POST["name"]));
    $phone = strip_tags(trim($_POST["phone"]));
    
    // Валидация данных
    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo "Пожалуйста, заполните все обязательные поля.";
        exit;
    }
    
    // Email получателя
    $to = "maxzb86@gmail.com";
    $subject = "Новая заявка с сайта";
    
    // Тело email
    $body = "Имя: $name\n";
    $body .= "Телефон: $phone\n";
    
    // Заголовки
    $headers = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Reply-To: $to\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Отправка email
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "Сообщение успешно отправлено!";
    } else {
        http_response_code(500);
        echo "Ошибка при отправке сообщения.";
    }
} else {
    http_response_code(403);
    echo "Метод запроса не поддерживается.";
}
?>