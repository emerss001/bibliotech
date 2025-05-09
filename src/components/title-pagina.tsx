interface TitlePaginaProps {
    title: string;
    description: string;
    adicional?: React.ReactNode;
}

const TitlePagina = ({ title, description, adicional }: TitlePaginaProps) => {
    return (
        <div>
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="font-bold text-3xl">{title}</h1>
                <p className="text-sm text-primary font-normal">{description}</p>
            </div>
            <div>{adicional}</div>
        </div>
    );
};

export default TitlePagina;
