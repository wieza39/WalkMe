import '../assets/sass/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-section">
                    <div className="footer-item">
                        <h2>Kontakt</h2>
                        <ul>
                            <li>Email: kontakt@twojadomena.pl</li>
                            <li>Telefon: +48 123 456 789</li>
                            <li>Adres: Ul. Przykładowa 1, 00-001 Miasto</li>
                        </ul>
                    </div>
                    <div className="footer-item">
                        <h2>Media społecznościowe</h2>
                        <ul className="social-links fa-xl ">
                            <li >
                                <a href="https://www.facebook.com"><i className="px-3 fa-brands fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com"><i className="px-3 fa-brands fa-x-twitter"></i></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com"><i className="px-3 fa-brands fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com"><i className="px-3 fa-brands fa-tiktok"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-item">
                        <h2>Informacje prawne</h2>
                        <ul>
                            <li><a href="#">Polityka prywatności</a></li>
                            <li><a href="#">Warunki użytkowania</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;