const Footer = () => {
    return (
        <footer className="border-t py-6 bg-muted px-12">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">© 2025 BiblioTech Acessível</p>
                    <p className="text-xs text-muted-foreground">Todos os direitos reservados</p>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">
                        Política de Privacidade
                    </a>
                    <a href="#" className="hover:underline">
                        Termos de Uso
                    </a>
                    <a href="#" className="hover:underline">
                        Contato
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
