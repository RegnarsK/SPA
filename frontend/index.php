<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Front</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    
    <button id="show-register-btn" >Register</button>
    <form action="/api/register" method="post" id="register-form" style="display: none;">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required>

        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>

        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>

        <label for="password_confirmation">password_confirmation</label>
        <input type="password" name="password_confirmation" id="password_confirmation" required>

        <input type="submit" value="Register">
    </form>
    <div id="register-response"></div>



   
    <button id="show-login-btn">Login</button>
    <form action="/api/login" method="post" id="login-form" style="display: none;">
        <label for="mail">Email</label>
        <input type="email" name="email" id="email" required>

        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>

        <input type="submit" value="Login">
    </form>
    <div id="login-response"></div>
</div>


    <div class="container" id="get-user-container" style="display: none;">
        <h2>Get user</h2>
        <form action="/api/user" method="get" id="get-user-form">
            <label for="token">Token</label>
            <input type="text" name="token" id="token">

            <input type="submit" value="Get">
        </form>
        <div id="user-data"></div>
    </div>

    <div class="container" id="create-post-container" style="display: none;">
        <h2>Create post</h2>
        <form action="/api/posts" method="post" id="create-post-form">
            <label for="token">Token</label>
            <input type="text" name="token" id="token">

            <label for="title">Title</label>
            <input type="text" name="title" id="title">

            <label for="body">Body</label>
            <textarea name="body" id="body"></textarea>

            <input type="submit" value="Create">
        </form>
        <div id="post-data" ></div>
    </div>
    <div class="container" id="posts" style="display: none;">
        <h2>Posts</h2>
        <div id="user-posts"></div>
    </div>
    <script src="js/app.js"></script>
</body>
</html>