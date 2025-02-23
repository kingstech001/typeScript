type User = {
    id: number;
    name: string;
    email: string;
    type: 'user';
  };
  
  type Admin = {
    id: number;
    name: string;
    role: string;
    type: 'admin';
  };
  
  type Person = User | Admin;
  
  type FilterCriteria<T> = Omit<Partial<T>, 'type'>;
  
  function filterPersons<T extends 'user' | 'admin'>(
    persons: Person[],
    personType: T,
    criteria: FilterCriteria<T extends 'user' ? User : Admin>
  ): (T extends 'user' ? User[] : Admin[]) {
    return persons.filter(person => {
      if (person.type !== personType) return false;
      return Object.keys(criteria).every(key => {
        return (person as any)[key] === (criteria as any)[key];
      });
    }) as any;
  }
  
  // Example usage
  const people: Person[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', type: 'user' },
    { id: 2, name: 'Bob', role: 'Manager', type: 'admin' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', type: 'user' },
    { id: 4, name: 'Dave', role: 'Supervisor', type: 'admin' },
  ];
  
  const users = filterPersons(people, 'user', { name: 'Alice' });
  const admins = filterPersons(people, 'admin', { role: 'Manager' });
  
  console.log(users); // [{ id: 1, name: 'Alice', email: 'alice@example.com', type: 'user' }]
  console.log(admins); // [{ id: 2, name: 'Bob', role: 'Manager', type: 'admin' }]
  