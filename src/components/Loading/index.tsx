import Image from "next/image";
import { useTheme } from "../../contexts/theme";
import { styled, lightTheme } from "../../../stitches.config";

const Main = styled('main', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 99,
  background: '$bg_color',

  display: 'grid',
  placeItems: 'center',

  height: '100vh',
});

const Centered = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Loader = styled('div', {
  width: '500px',
  height: '10px',
  background: '$bg_loader',
  overflow: 'hidden',
  borderRadius: '20px',

  marginTop: '78px',

  position: 'relative',
});

const LoaderValue = styled('div', {
  transition: 'width 1s ease',
  background: '$bg_loader_value',

  borderRadius: '20px',

  height: '100%',
})

type LoadingProps = {
  completed: number;
}

function Loading({
  completed,
}: LoadingProps){
  const { currentTheme} = useTheme()

  return(
    <Main>
      <Centered>

        <Image
          src={`/assets/brand_text_${currentTheme ===  lightTheme ? 'dark' : 'light'}.svg` }
          alt='note.me brand'
          width={226}
          height={60}
        />

        <Loader>
          <LoaderValue
            css={{
              width: `${completed}%`
            }}
          ></LoaderValue>
        </Loader>
      </Centered>
    </Main>
  );
}

export default Loading;
