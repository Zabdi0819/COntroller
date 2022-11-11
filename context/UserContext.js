import { createContext, useState } from "react";

const UserContext = createContext({
    email: null
});

export default UserContext;