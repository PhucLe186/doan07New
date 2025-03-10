import Button from '~/component/Button';
import { useContext } from 'react';
import { AuthContext } from '~/AuthContext';
function List({ data }) {
    const { logout } = useContext(AuthContext);
    return (
        <Button
            to={data.to}
            onClick={() => {
                logout();
            }}
        >
            {data.title}
        </Button>
    );
}

export default List;
