import Image from "next/image";

export interface SizableImageProps {
    /**
     * O caminho da imagem
     */
    src: string;
    /**
     * A largura desejada para a imagem
     */
    width?: number;
    /**
     * A altura desejada para a imagem
     */
    height?: number;
    /**
     * O texto alternativo para a imagem
     */
    alt: string;
    /**
     * A proporção a ser aplicada na imagem.
     * OBS: Só é aplicado se *width* e *height* são informados
     */
    scale?: number;
}

/**
 * Esse componente é uma forma genérica de exibir uma imagem e redimensioná-la para o tamanho desejado
 */
export default function SizableImage({ src, alt, width, height, scale = 1 }: SizableImageProps) {
    return <Image src={src} alt={alt} width={width ? width * scale : width} height={height ? height * scale : height} />;
}
