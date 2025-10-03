import style from './style.module.scss';

function MainLayout({children}: {children: React.ReactNode}) {

    const {wrapLayout, container} = style;

  return (
    <main className= {wrapLayout} >
        <div className={container}>
            {children}
        </div>
    </main>
  );
}

export default MainLayout;