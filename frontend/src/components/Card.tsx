interface CardProps {
    image?: string;
    title?: string;
    description?: string
    movie: any;
}

const Card =  ({image, title, description,movie}: CardProps) => {
    return (
        <>
        <div className="h-96 w-60">
            <img src={image} className="w-full" alt="" />
            <h1 className="font-medium text-white text-lg overflow-hidden truncate whitespace-nowrap text-overflow-ellipsis">{title}</h1>
            <h2 className="truncate text-white font-light">{description}</h2>
        </div>
        </>
    )
}

export default Card;
