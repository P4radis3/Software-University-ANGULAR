export interface Note {
    _id: string;
    text: string;
    userId: {
      _id: string;
      username: string;
    };
    task: string;
    createdAt: string;
    updatedAt: string;
  }