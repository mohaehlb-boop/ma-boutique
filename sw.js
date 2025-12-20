self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'Nouvelle notification personnalisée !',
        icon: 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png'
    };
    event.waitUntil(
        self.registration.showNotification('Ma Boutique', options)
    );
});
