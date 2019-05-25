import React, { Fragment } from 'react';
import { PageHeader, Typography, Tabs } from 'antd';
import Posts from '../../../components/Posts';
import Materials from 'pages/Materials';
import AreasQuery from 'store/singleArea/queries/SingleArea';
import Loader from 'components/Loader';
import { HeaderWrapper, AreaImage } from './styles';

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const convertAreaURL = (areaURL: string) => {
  switch (areaURL) {
    case 'web-development':
      return 'Web Development';
    case 'marketing-internetowy':
      return 'Online Marketing';
    case 'ux-ui-design':
      return 'UX/UI Design';
    case 'data-science':
      return 'Data Science';
    default:
      return null;
  }
};

const SingleArea = ({ match }: Props) => {
  const areaURL: string = match.params.singleArea;
  const renderTabs = () => (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Aktualności" key="1">
        <Posts area={areaURL} />
      </TabPane>
      <TabPane tab="Członkowie" key="2">
        <div>Członkowie</div>
      </TabPane>
      <TabPane tab="Materiały" key="3">
        <Materials area={convertAreaURL(areaURL)} />
      </TabPane>
    </Tabs>
  );

  return (
    <Fragment>
      <AreasQuery area={{ areaURL }}>
        {({ data, error, loading }) => {
          if (loading) return <Loader />;
          if (error) return <div>{error.message}</div>;
          const { name, description, image } = data.areas[0];
          return (
            <Fragment>
              <PageHeader title={name} footer={renderTabs()}>
                <HeaderWrapper>
                  <div className="content">
                    <Paragraph>{description}</Paragraph>
                  </div>
                  <AreaImage src={image} />
                </HeaderWrapper>
              </PageHeader>
            </Fragment>
          );
        }}
      </AreasQuery>
    </Fragment>
  );
};

interface Props {
  match: {
    params: {
      singleArea: string;
    };
  };
}

export default SingleArea;
