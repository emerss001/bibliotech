interface TitlePaginaProps {
    title: string;
    description: string;
    adicional?: React.ReactNode;
}

const TitlePagina = ({ title, description, adicional }: TitlePaginaProps) => {
    return (
        <div>
            <div>
                <h1 className="font-bold text-3xl">{title}</h1>
                <p className="text-sm text-primary">{description}</p>
            </div>
            <div>{adicional}</div>
        </div>
    );
};

export default TitlePagina;
