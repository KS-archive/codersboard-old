import React from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Breadcrumbs = ({ history }: RouteComponentProps) => {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default withRouter(Breadcrumbs);
