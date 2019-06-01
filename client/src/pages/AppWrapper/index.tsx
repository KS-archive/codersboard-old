import React, { useState, useEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { AppWidthContext } from 'utils/context';
import Sidebar from './Sidebar';
import Header from './Header';
import * as styles from './styles';

const { Container, RightColumn, Content } = styles;

function useClientRectObserver() {
  const ref = useRef();
  const [rect, setRect] = useState(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }

      setRect(entries[0].contentRect);
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.unobserve(ref.current);
  }, []);

  return [rect, ref];
}

const AppWrapper: React.FC<IProps> = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [rect, ref] = useClientRectObserver();
  const [sidebarRect, sidebarRef] = useClientRectObserver();
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Container>
      <div ref={sidebarRef}>
        <Sidebar collapsed={collapsed} />
      </div>
      <RightColumn>
        <Header
          isSidebarCollapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          appWidth={sidebarRect && sidebarRect.width}
        />
        <Content ref={ref}>
          <AppWidthContext.Provider value={rect && rect.width}>{props.children}</AppWidthContext.Provider>
        </Content>
      </RightColumn>
    </Container>
  );
};

interface IProps {
  children: React.ReactElement;
}

export default AppWrapper;
