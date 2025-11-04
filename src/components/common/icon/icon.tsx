import IconSprite from 'assets/icons-sprite.svg'

type Props = {
  id: string
  width?: string
  height?: string
  viewBox?: string
}

export const Icon = ({ id, viewBox, width, height }: Props) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox={viewBox || '0 0 24 24'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use xlinkHref={`${IconSprite}#${id}`} />
    </svg>
  )
}