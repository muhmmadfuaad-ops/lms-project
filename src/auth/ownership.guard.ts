import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const id = Number(request.params.id);

    if (Number.isNaN(id) && user.role !== 'admin') {
      console.log('user:', user)
      throw new ForbiddenException(`Invalid id: ${id}`);
    }

    const tokenUserId = Number(user?.id);
    const tokenRole = user?.role;

    // Reusable logic
    const isOwner = Number.isFinite(tokenUserId) && tokenUserId === id;
    const isAdmin = tokenRole === 'admin';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }

    return true;
  }
}
