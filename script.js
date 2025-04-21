document.addEventListener('DOMContentLoaded', function () {
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            backToTopButton.classList.remove('visible');
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Particle animation
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const posX = Math.random() * 100;
        const posY = Math.random() * 100 + 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particlesContainer.appendChild(particle);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal definitions
    const modals = {
        followers: document.getElementById('followersModal'),
        gamerscore: document.getElementById('gamerscoreModal'),
        gamertag: document.getElementById('gamertagModal'),
        lfg: document.getElementById('lfgModal'),
        followerBot: document.getElementById('followerBotModal'),
        messageSpammer: document.getElementById('messageSpammerModal'),
        profilePicture: document.getElementById('profilePictureModal'),
        profilePictureCheckout: document.getElementById('profilePictureCheckoutModal'),
        contactUs: document.getElementById('contactUsModal')
    };

    // Button definitions
    const buttons = {
        followers: document.querySelectorAll('.followers-purchase-btn'),
        gamerscore: document.querySelectorAll('.gamerscore-purchase-btn'),
        gamertag: document.querySelectorAll('.gamertag-purchase-btn'),
        lfg: document.querySelectorAll('.lfg-purchase-btn'),
        followerBot: document.querySelectorAll('.follower-bot-purchase-btn'),
        messageSpammer: document.querySelectorAll('.message-spammer-purchase-btn'),
        profilePicture: document.querySelectorAll('.profile-picture-purchase-btn'),
        profilePictureCheckout: document.querySelectorAll('.profile-picture-checkout-btn'),
        contactUs: document.querySelectorAll('.custom-package-btn')
    };

    // Open modals on button click
    Object.keys(buttons).forEach(key => {
        buttons[key].forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                if (key === 'contactUs') {
                    modals.contactUs.style.display = 'flex';
                } else if (key === 'profilePictureCheckout') {
                    modals.profilePictureCheckout.style.display = 'flex';
                } else if (key === 'profilePicture') {
                    modals.profilePictureCheckout.style.display = 'flex';
                } else {
                    modals[key].style.display = 'flex';
                }
                document.body.style.overflow = 'hidden';
            });
        });
    });

    // Close modals
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            this.closest('.modal-overlay').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Package selection
    document.querySelectorAll('.package-option').forEach(option => {
        option.addEventListener('click', function () {
            const modal = this.closest('.modal-overlay');
            modal.querySelectorAll('.package-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const price = this.dataset.price;
            const packageName = this.querySelector('h4').textContent;
            modal.querySelector('.selected-package').textContent = packageName;
            modal.querySelector('.selected-price').textContent = `$${price}`;
            modal.querySelector('.total-price').textContent = `$${price}`;
        });
    });

    // Payment method selection
    document.querySelectorAll('.method-option').forEach(option => {
        option.addEventListener('click', function () {
            const modal = this.closest('.modal-overlay');
            modal.querySelectorAll('.method-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Purchase handlers for Stripe Checkout
    const purchaseHandlers = {
        followers: {
            selector: '#followersModal .followers-purchase-btn',
            inputs: ['followers-gamertag'],
            tosCheckbox: 'followers-tos-agreement'
        },
        gamerscore: {
            selector: '#gamerscoreModal .gamerscore-purchase-btn',
            inputs: ['gamerscore-gamertag', 'gamerscore-email', 'gamerscore-password'],
            tosCheckbox: 'gamerscore-tos-agreement'
        },
        gamertag: {
            selector: '#gamertagModal .gamertag-purchase-btn',
            inputs: ['gamertag-email'],
            tosCheckbox: 'gamertag-tos-agreement'
        },
        lfg: {
            selector: '#lfgModal .lfg-purchase-btn',
            inputs: ['lfg-email'],
            tosCheckbox: 'lfg-tos-agreement'
        },
        followerBot: {
            selector: '#followerBotModal .follower-bot-purchase-btn',
            inputs: ['follower-bot-email'],
            tosCheckbox: 'follower-bot-tos-agreement'
        },
        messageSpammer: {
            selector: '#messageSpammerModal .message-spammer-purchase-btn',
            inputs: ['message-spammer-email'],
            tosCheckbox: 'message-spammer-tos-agreement'
        },
        profilePicture: {
            selector: '#profilePictureModal .profile-picture-purchase-btn',
            inputs: ['profile-picture-gamertag', 'profile-picture-email', 'profile-picture-password', 'profile-picture-selection'],
            tosCheckbox: 'profile-picture-tos-agreement'
        },
        profilePictureCheckout: {
            selector: '#profilePictureCheckoutModal .profile-picture-checkout-btn',
            inputs: ['profile-picture-checkout-gamertag', 'profile-picture-checkout-email', 'profile-picture-checkout-password', 'profile-picture-checkout-link'],
            tosCheckbox: 'profile-picture-checkout-tos-agreement'
        }
    };

    // Handle purchase with Stripe
    Object.keys(purchaseHandlers).forEach(key => {
        document.querySelector(purchaseHandlers[key].selector).addEventListener('click', async function (e) {
            e.preventDefault();
            const inputs = purchaseHandlers[key].inputs.map(id => document.getElementById(id));
            const tosCheckbox = document.getElementById(purchaseHandlers[key].tosCheckbox);
            const selectedPackage = modals[key].querySelector('.package-option.active');
            let hasError = false;

            // Validate inputs
            inputs.forEach(input => {
                if (!input.value) {
                    input.classList.remove('shake');
                    void input.offsetWidth;
                    input.classList.add('shake');
                    input.style.border = '2px solid #ff4444';
                    setTimeout(() => input.classList.remove('shake'), 500);
                    hasError = true;
                } else {
                    input.style.border = '';
                }
            });

            if (hasError) return;

            // Validate TOS checkbox
            if (!tosCheckbox.checked) {
                tosCheckbox.classList.remove('shake');
                void tosCheckbox.offsetWidth;
                tosCheckbox.classList.add('shake');
                setTimeout(() => tosCheckbox.classList.remove('shake'), 500);
                return;
            }

            // Gather package details
            const amount = selectedPackage.dataset.amount;
            const price = selectedPackage.dataset.price;
            const packageName = selectedPackage.querySelector('h4').textContent;
            const gamertag = inputs.find(input => input.id.includes('gamertag'))?.value || '';
            const email = inputs.find(input => input.id.includes('email'))?.value || '';
            const password = inputs.find(input => input.id.includes('password'))?.value || '';
            const pictureLink = inputs.find(input => input.id.includes('checkout-link'))?.value || '';
            const pictureSelection = inputs.find(input => input.id.includes('selection'))?.value || '';

            // Send request to backend to create Stripe Checkout session
            try {
                const response = await fetch('http://localhost:3000/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        packageName,
                        amount,
                        price: parseFloat(price),
                        gamertag,
                        email,
                        password,
                        pictureLink,
                        pictureSelection
                    }),
                });

                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url; // Redirect to Stripe Checkout
                } else {
                    alert('Error creating checkout session');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    });

    // Input validation on blur
    document.querySelectorAll('input[required], select[required]').forEach(input => {
        input.addEventListener('blur', function () {
            if (!this.value) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
});
