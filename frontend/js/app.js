window.onload = function() {
    const getForm = document.getElementById('get-user-form');
    getForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let token = formData.get('token');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/userdata', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/html'
                }
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email}<br>
                                                                    User Name: ${data.name}</p>`;
                await fetchAllPosts(token);
            }

        } catch (error) {
           console.log(error);
        }
    });

    const postForm = document.getElementById('create-post-form');
    postForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let token = formData.get('token');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: formData.get('title'),
                    body: formData.get('body')
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('post-data').innerHTML = `<p>Post Created Successfully!</p>
                                                                  <p><strong>Title:</strong> ${data.title}, <strong>Body:</strong> ${data.body}</p>`;
                await fetchAllPosts(token);

                document.getElementById('title').value = '';
                document.getElementById('body').value = '';
            }

        } catch (error) {
            console.log(error);
        }
    });

    async function fetchAllPosts(token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const posts = await response.json();

            if (response.ok) {
                const postsContainer = document.getElementById('user-posts');
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    postsContainer.innerHTML += `
                        <div class="post">
                            <p>Title: ${post.title}</p>
                            <p>Body: ${post.body}</p>
                        </div>
                    `;
                });
            
            }
        } catch (error) {
            console.log(error);
        }
    }

    const token = document.getElementById('token').value;
    if (token) {
        fetchAllPosts(token);
    }
    let isAuthenticated = false; // Track authentication state

    // Register form handling
    const registerForm = document.getElementById('register-form');
    const showRegisterBtn = document.getElementById('show-register-btn');

    showRegisterBtn.addEventListener('click', function() {
        registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
    });

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    password: formData.get('password_confirmation')
                })
            });

            if (response.ok) {
                alert('Registration Successful! Please log in.');
                registerForm.reset();
                registerForm.style.display = 'none'; // Hide form after registration
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }

        } catch (error) {
            console.error(error);
            alert('Registration failed. Please try again.');
        }
    });

    // Login form handling
    const loginForm = document.getElementById('login-form');
    const showLoginBtn = document.getElementById('show-login-btn');

    showLoginBtn.addEventListener('click', function() {
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    });

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password')
                })
            });

            if (response.ok) {
                const data = await response.json();
                isAuthenticated = true; // Set authentication state
                alert('Login Successful!');

                // Show the "Get User" and "Create Post" containers
                document.getElementById('get-user-container').style.display = 'block';
                document.getElementById('create-post-container').style.display = 'block';

                // Optionally store token or user info in local storage
                // localStorage.setItem('token', data.token);

                loginForm.reset();
                loginForm.style.display = 'none'; // Hide login form
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }

        } catch (error) {
            console.error(error);
            alert('Login failed. Please try again.');
        }
    });
};
