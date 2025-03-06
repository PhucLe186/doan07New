import Button from '~/component/Button';
function List({ data }) {
    return <Button to={data.to}>{data.title}</Button>;
}

export default List;
