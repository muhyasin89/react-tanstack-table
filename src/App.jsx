import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

function App() {
  const queryClient = useQueryClient();

  const { data,error, isLoading } = useQuery({
    queryKey: ["todo"], 
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then((res)=> 
      res.json()),
      refetchInterval: 4000,
      refetchOnWindowFocus: false
      });

  const {mutate, isPending, isError, isSuccess} = useMutation({mutationFn: (newPost) => fetch("https://jsonplaceholder.typicode.com/posts",
    { method: "POST",
      body: JSON.stringify(newPost),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then((res) => res.json()),
    onSuccess: (newPost) => {
      //queryClient.invalidateQuery({queryKey: ["todo"]})
      queryClient.setQueryData(['todo'], (oldPost)=> [...oldPost, newPost])
    }
  })

  if (error || isError) return <div>There was an Error!</div>

  if (isLoading) return <div>Data is Loading</div>

  return (
    <>

    { isPending && <p> Data Is Being Added</p>}
    <button onClick={() => mutate( {
    "userId": 5000,
    "id": 4000,
    "title": "Hey My Name is Yasin",
    "body": "THis is Test"
  })}>
      Add Post
    </button>

  
    {" "}
      { data?.map((todo) => (
        <div>
          {" "}
          <p>ID: {todo.id}. 
          Title: {todo.title}
          Body: {todo.body}
          </p>
        </div>
      ))}
    </>
  )
}

export default App
