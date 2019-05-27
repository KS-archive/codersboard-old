import React, { Component } from 'react';
import { Typography, Spin, Modal, Empty } from 'antd';
import withMaterials, { IMaterial } from './store/withMaterials';
import MaterialCard from './MaterialCard';
import AddMaterial from './AddMaterial';
import SearchBar from './SearchBar';
import Loader from 'components/Loader';
import { MaterialsContainer, Header, AddButton, Grid, Wrapper } from './styles';

const { Title } = Typography;

class Materials extends Component<IProps, IState> {
  state = {
    modal: false,
    searchedMaterials: this.props.materials,
  };

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.props.materials !== prevProps.materials) {
      this.setState({ searchedMaterials: this.props.materials });
    }
  }

  handleSearch(e: any) {
    console.log(this.props);
    const { materials } = this.props;
    let currentMaterials = [];
    let filteredMaterials = [];
    if (e.target.value !== '') {
      currentMaterials = materials;
      filteredMaterials = currentMaterials.filter(material => {
        const lc = material.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      filteredMaterials = materials;
    }
    this.setState({ searchedMaterials: filteredMaterials });
  }

  renderMaterials() {
    if (this.state.searchedMaterials && this.state.searchedMaterials.length === 0) {
      return <Empty description="Brak wyników wyszukiwania" />;
    }
    if (this.state.searchedMaterials) {
      const materials = this.state.searchedMaterials.map((material: IMaterial) => (
        <MaterialCard key={material.id} {...material} />
      ));
      return <Grid>{materials}</Grid>;
    }
    return Loader;
  }

  render() {
    console.log(this.state.searchedMaterials ? this.state.searchedMaterials.length : '');
    return (
      <MaterialsContainer>
        <Header>
          <SearchBar search={(e: any) => this.handleSearch(e)} />
          <Wrapper>
            <Title level={2}>Materiały</Title>
            <AddButton type="primary" onClick={(): void => this.setState({ modal: true })}>
              Dodaj materiał
            </AddButton>
          </Wrapper>
        </Header>
        <Spin tip="Wczytywanie materiałów..." spinning={this.props.materialsLoading}>
          {this.renderMaterials()}
        </Spin>
        <Modal
          title="Dodaj nowy materiał"
          footer={null}
          visible={this.state.modal}
          onCancel={(): void => this.setState({ modal: false })}
        >
          <AddMaterial hideModal={(): void => this.setState({ modal: false })} />
        </Modal>
      </MaterialsContainer>
    );
  }
}

interface IProps {
  materials: IMaterial[];
  materialsLoading: boolean;
}

interface IState {
  modal: boolean;
  searchedMaterials: any;
}

export default withMaterials(Materials);
