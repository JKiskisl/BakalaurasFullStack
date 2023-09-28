import sys
from unittest.mock import patch

import uvicorn

def test_uvicorn_run_invocation():
    # Modify sys.path to include the directory where main.py resides
    sys.path.append("path/to/main.py")  # Replace with the actual path
    
    with patch("uvicorn.run") as mock_run:
        import main
        
        mock_run.assert_called_once_with("app.api:app", host="0.0.0.0", port="8081")
    
    # Remove the appended path from sys.path
    sys.path.remove("path/to/main.py")
