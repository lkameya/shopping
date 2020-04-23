import { Query, Mutation } from '@apollo/react-components';
import Error from '../_Shared/ErrorMessage';
import { gql } from '@apollo/client';
import Table from '../_Shared/Table';
import StyledButton from '../_Shared/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE'
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission],
  $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return null;
      return (
        <div>
          <Error error={error} />
          <div>
            <h2>Manage Permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map(permission => (
                    <th key={permission}>{permission}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => (
                  <UserPermissions user={user} key={user.id} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )
    }}
  </Query>
);

UserPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    Permissions: PropTypes.array
  }).isRequired,
}

function UserPermissions({ user }) {
  const [permissions, setPermissions] = useState(user.permissions);

  const handlePermissionChange = e => {
    const checkbox = e.target;

    let updatedPermissions = [...permissions];

    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }
    setPermissions(updatedPermissions);
  }

  return (
    <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{
      permissions,
      userId: user.id
    }}>
      {(updatePermissions, { loading, error }) => console.log(permissions) || (
        <>
          {error && <tr><Error error={error} /></tr>}
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {possiblePermissions.map(permission => (
              <td key={permission}>
                <label htmlFor={`${user.id}-permission-${permission}`}>
                  <input id={`${user.id}-permission-${permission}`} type="checkbox" checked=
                    {permissions.includes(permission)}
                    value={permission}
                    onChange={handlePermissionChange}
                  />
                </label>
              </td>
            ))}
            <td>
              <StyledButton type="button" disabled={loading}
                onClick={updatePermissions}
              >Update</StyledButton>
            </td>
          </tr>
        </>
      )}
    </Mutation>
  )
}

export default Permissions;
