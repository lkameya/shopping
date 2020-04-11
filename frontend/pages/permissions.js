import Permissions from '../components/Permissions';
import PleaseSignin from '../components/PleaseSignin.js';

const PermissionsPage = props => (
  <div>
    <PleaseSignin>
      <Permissions>Permissions</Permissions>
    </PleaseSignin>
  </div>
)

export default PermissionsPage;
