const apiUrl = 'http://localhost/zEmployee/backend/api/';

export interface Employee {
    id: number;
    name: string;
    position: string;
    salary: number;
  }
  
  export const getEmployees = async (): Promise<Employee[]> => {
    try {
      const response = await fetch(`${apiUrl}employees`,{ mode: 'no-cors' });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching employees:', errorData);
        throw new Error(`HTTP error ${response.status}: ${errorData.message}`);
      }
      const data: Employee[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  };
  
  export const getEmployee = async (id: number): Promise<Employee> => {
    try {
      const response = await fetch(`${apiUrl}employees/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data: Employee = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}:`, error);
      throw error;
    }
  };