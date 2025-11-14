import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log('user:', user)
    console.log('err:', err)
    console.log('info:', info)
    if (err || !user) {
      throw new UnauthorizedException('Please sign in to access this resource.');
    }
    return user;
  }
}

// import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
//
// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//
//   canActivate(context: ExecutionContext) {
//     const req = context.switchToHttp().getRequest();
//     console.log('req.headers:', req.headers);
//
//     const authHeader = req.headers['authorization'];
//
//     console.log('authHeader:', authHeader);
//
//     // Continue with normal AuthGuard workflow
//     return super.canActivate(context);
//   }
//
//   handleRequest(err, user, info) {
//     console.log('user:', user)
//     console.log('err:', err)
//     console.log('info:', info)
//
//     if (err || !user) {
//       throw new UnauthorizedException('Please sign in to access this resource.');
//     }
//     return user;
//   }
// }
