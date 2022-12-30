const logoutHandler = async () => {
    const response = await fetch ('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response + "see this");
    if (response.ok) {
        document.location.replace('/');
        alert ('You have logged out!')
    } else {
        alert ('Something wrong!')
    }
};

document.querySelector('#logout').addEventListener('click', logoutHandler);