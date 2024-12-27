from src.user.models import User
from src.user.schemas import UserCreate, UserUpdate, UserResponse
from src.db.base import Base
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from src.auth.utils.password import hash_password
import re

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def get_users(self):
        return self.db.query(User).all()
    
    def get_user_by_id(self, id: int):
        return self.db.query(User).filter(User.id == id).first()
    
    def create_user(self, user: UserCreate) -> UserResponse:
        if self.get_user_by_email(user.email):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already in use")
        
        self.validate_password_strength(user.password)
        
        user.password = hash_password(user.password)
        db_user = User(**user.dict())
        try:
            self.db.add(db_user)
            self.db.commit()
            self.db.refresh(db_user)
            return db_user
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    
    
    def update_user(self, user_id: int, user: UserUpdate):
        if not self.get_user_by_id(user_id):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        try:
            self.db.query(User).filter(User.id == user_id).update(user.dict())
            self.db.commit()
            return self.get_user_by_id(user_id)
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
        
    def delete_user(self, user_id: int):
        if not self.get_user_by_id(user_id):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        try:
            self.db.query(User).filter(User.id == user_id).delete()
            self.db.commit()
            return {"message": "User deleted successfully"}
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    def change_password(self, user_id: int, password: str):
        if not self.get_user_by_id(user_id):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        self.validate_password_strength(password)
        
        try:
            self.db.query(User).filter(User.id == user_id).update({"password": hash_password(password)})
            self.db.commit()
            return {"message": "Password changed successfully"}
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    def get_user_by_email(self, email: str):
        return self.db.query(User).filter(User.email == email).first()
    
    def validate_password_strength(self, password: str) -> None:
        """
        Validates password to ensure it meets the following criteria:
        - At least 8 characters long
        - Contains both uppercase and lowercase characters
        - Contains at least one number
        - Contains at least one special character
        """
        if len(password) < 8:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must be at least 8 characters long")
        if not re.search(r'[A-Z]', password):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must contain at least one uppercase letter")
        if not re.search(r'[a-z]', password):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must contain at least one lowercase letter")
        if not re.search(r'\d', password):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must contain at least one number")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must contain at least one special character")
        