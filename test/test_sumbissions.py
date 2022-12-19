from api_wrapper import ApiWrapper

def test_success_js():
    code = "var x = 1; \n console.log('output:' + x); \n console.log('second output');"
    output = ApiWrapper().send_code(
        code=code,
        langId=1
    )
    stderr = output['output']['stdout']
    print(f'output for code {code}:')
    print(stderr)
    # assert stdout == 'output:1\nsecond output'



def test_success_python():
    code = "x = 1\ny = 2\nprint(f'output: {x+y}')"
    output = ApiWrapper().send_code(
        code=code,
        langId=2
    )
    stderr = output['output']['stdout']
    print(f'output for code {code}:')
    print(stderr)

if __name__ == '__main__':
    test_success_js()
