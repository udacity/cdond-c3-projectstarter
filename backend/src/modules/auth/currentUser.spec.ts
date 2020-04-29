import { User } from './user.interface';
import { CurrentUser } from './currentUser';
import { Request } from 'express';

describe('Current User', () => {
  describe('When getting the logged user', () => {
    it('should return the user logged in the request', () => {
      const mockedLoggedUser: User = {
        username: 'TestUserName',
      };

      // @ts-ignore
      const MockRequest: Request = jest.fn<Request, []>(() => ({
        user: mockedLoggedUser,
      }));

      // arrange
      // @ts-ignore
      const mockRequest = new MockRequest();

      const curretUser = new CurrentUser(mockRequest);

      // act

      const user = curretUser.getUser();

      // assert
      expect(mockedLoggedUser).toEqual(user);
    });
  });
});
