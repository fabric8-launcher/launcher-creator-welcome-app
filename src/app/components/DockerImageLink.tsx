import * as React from 'react';
import { ExternalLink } from '../../shared/components/ExternalLink';


interface DockerImageLinkProps {
  readonly image: string;
}

const REDHAT_REGISTRY = 'registry.access.redhat.com/';

const DockerImageLink: React.SFC<DockerImageLinkProps> = ({ image }: DockerImageLinkProps) => {
    let imageName = image;
    let imageUrl;
    if (image.startsWith(REDHAT_REGISTRY)) {
        imageName = image.replace(REDHAT_REGISTRY, '');
        imageUrl = `https://access.redhat.com/containers/?tab=overview#/${image}`;
    }
    return (
        <span>
        {imageName} {imageUrl && (<span>- <ExternalLink href={imageUrl}> Learn more</ExternalLink></span>)}
        </span>
    );
}


export default DockerImageLink;