# C++ lambda

### 模板如何识别lambda表达式

随着lambda表达式在C++中的应用越来越普遍，经常会遇到跟lambda表达式相关的模板类型解析，但是标准C++还没有对应的traits。

lambda表达式本身是重载了operator () 的匿名类，可以根据此特性来识别是否lambda表达式，具体代码如下：

```C++
template<typename R, typename C, typename IsMutable, typename... Args>
struct lambda_type_info
{
	using type = R(Args...);
	using return_type = R;
 	using is_mutable = IsMutable;

	enum { arity = sizeof...(Args) };

	template<size_t i>
	struct arg
	{
		typedef typename std::decay<typename std::tuple_element<i, std::tuple<Args...>>::type>::type type;
	};
};

template<typename T, typename = void>
struct lambda_type
{
	static constexpr bool is_lambda = false;
};

template<class T>
struct lambda_type<T, typename std::enable_if<std::is_same<decltype(void(&T::operator())), void>::value>::type> : lambda_type<decltype(&T::operator())>
{
	static constexpr bool is_lambda = true;
};

template<typename R, typename C, typename... Args>
struct lambda_type<R (C::*)(Args...)> : lambda_type_info<R, C, std::true_type, Args...>
{
};

template<typename R, typename C, typename... Args>
struct lambda_type<R (C::*)(Args...) const> : lambda_type_info<R, C, std::false_type, Args...>
{
};
```

使用过程：

```c++
	auto lambda = [](int param) {};

	// 判断是否lambda表达式，可以用于enable_if中
	lambda_type<decltype(lambda)>::is_lambda;

	// 获取lambda表达式的函数调用类型 void(int)，可以用于某些需要转换成明确函数调用的地方
	std::function<lambda_type<decltype(lambda)>::type> pfn = lambda;

	// 获取lambda表达式的参数类型
	lambda_type<decltype(lambda)>::arg<0>::type param;
```

